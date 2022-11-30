import React, {useEffect, useState} from 'react';
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {onAuthStateChanged} from 'firebase/auth';
import Navigation from '../shared/navbar';
import '../../styles/todoliststyle.css'
import '../../styles/boardstyle.css';

function ToDoList()
{
    const [todoitems, setToDoItems] = useState([]);
    const [Checked, setChecked] = useState([]);
    const [numOfTasks, setNumOfTasks] = useState(0);
    const taskMax = 10;
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [temp, setTemp] = useState(false);
    const [font, setFont] = useState("font1");

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let dateStr = convertDateObjectToStr(date);

    if (performance.getEntriesByType("navigation")[0].type === "reload")
    {
        window.location.assign("/");
    }

    if (!temp)
    {
        onAuthStateChanged(author, () => {
            if (author.currentUser)
            {
                setTemp(true);
            }
        }
        );
    }

    useEffect(() => {
        const retrivePastSettingData = async () => {
            if (author.currentUser === null)
            {
                return;
            }
            const user = author.currentUser.uid;
            const settingsQ = query(collection(database, "settingsData"), where("authorID", "==", user));
            const settingsQRes = await getDocs(settingsQ);
            if (settingsQRes.docs.length !== 0)
            {
                const font_temp = settingsQRes.docs[0]._document.data.value.mapValue.fields.fontSet.stringValue;
                setFont(font_temp)
            }
        }
        const retrievePastTaskData = async () => {
            if (author.currentUser === null)
            {
                return;
            }
            const user = author.currentUser.uid;
            const taskQ = query(collection(database, "taskData"), where("authorID", "==", user));
            const taskQRes = await getDocs(taskQ);
            if (taskQRes.docs.length !== 0)
            {
                let tempTaskEntries = [];
                let tempChecked = [];
                let pastTaskEntries = taskQRes.docs[0]._document.data.value.mapValue.fields.value.arrayValue;
                let pastChecked = taskQRes.docs[0]._document.data.value.mapValue.fields.checked.arrayValue;
                if (Object.keys(pastTaskEntries).length === 0 || Object.keys(pastChecked).length === 0)
                {
                    return;
                }
                pastTaskEntries = pastTaskEntries.values;
                pastChecked = pastChecked.values;
                let len = pastTaskEntries.length;
                for (let i = 0; i < len; i++)
                {
                    tempTaskEntries.push(pastTaskEntries[i].stringValue);
                }
                len = pastChecked.length;
                for (let i = 0; i < len; i++)
                {
                    tempChecked.push(pastChecked[i].booleanValue)
                }
                setChecked(tempChecked);
                setToDoItems(tempTaskEntries);
            }
        };
        
        retrievePastTaskData();
        retrivePastSettingData();
    }, [temp]);

    async function saveTaskData(c, checkedItems)
    {
        const user = author.currentUser.uid;
        const taskQ = query(collection(database, "taskData"), where("authorID", "==", user));
        const taskQRes = await getDocs(taskQ);
        if (taskQRes.docs.length !== 0)
        {
            const taskID = taskQRes.docs[0].id;
            const tasksToUpdate = doc(getFirestore(), "taskData", taskID);
            await updateDoc(tasksToUpdate, {value: c, checked: checkedItems});
        }
        else
        {
            await addDoc (collection(database, "taskData"), {
                authorName: author.currentUser.displayName,
                authorID: author.currentUser.uid,
                value: c,
                checked: checkedItems
            }
            );
        }
    }

    function handleTask()
    {
        let val = document.getElementById("taskValue").value;
        val = val.trim();
        
        // adds inputed task to the to-do list if not a repeat and there
            // are less than the max number of tasks
        if (todoitems.includes(val) === false && val !== '' 
            && numOfTasks < taskMax) 
        {   
            todoitems.push(val);
            Checked.push(false);
            setChecked(Checked);
            setToDoItems(todoitems, saveTaskData(todoitems, Checked));
            setNumOfTasks(numOfTasks + 1);
        }
        document.getElementById("taskValue").value = ''; // clears input box
    }

    function handleCheck(val)
    {
        // TODO: can update to do strikethrough/other styling here later

        let tempChecked = [];
        const len = Checked.length;
        console.log("length: " + len);
        for (let i = 0; i < len; i++)
        {
            tempChecked.push(document.getElementById("check" + i).checked)
        }
        setChecked(tempChecked);
        saveTaskData(todoitems, tempChecked);
    }

    function handleDelete(val)
    {
        var copiedList = [];
        let copiedChecked = [];
        const indexOfClick = todoitems.indexOf(val);

        // copies all except the 'X' task from the current to-do list
            // into a new list (essentially removing the one task)
        for (let i = 0; i < todoitems.length; i++)
        {
            if (i !== indexOfClick)
            {
                copiedList.push(todoitems[i]);
                copiedChecked.push(Checked[i]);
            }
        }
        setChecked(copiedChecked);
        setToDoItems(copiedList, saveTaskData(copiedList, copiedChecked));
        setNumOfTasks(numOfTasks - 1);
    }

    async function saveArchiveData(c)
    {
        const userAndDate = author.currentUser.uid + dateStr;
        const todoQ = query(collection(database, "todoListArchive"), where("userDateSearch", "==", userAndDate));
        const todoQRes = await getDocs(todoQ);
        if (todoQRes.docs.length !== 0)
        {
            let tempArchiveItem = todoQRes.docs[0]._document.data.value.mapValue.fields.value.arrayValue.values;
            let updatedArchiveItem = [];
            let len = tempArchiveItem.length;
            for (let i = 0; i < len; i++)
            {
                updatedArchiveItem.push(tempArchiveItem[i].stringValue)
            }
            len = c.length;
            for (let i = 0; i < len; i++)
            {
                updatedArchiveItem.push(c[i])
            }

            const todoID = todoQRes.docs[0].id;
            const archiveItemToUpdate = doc(getFirestore(), "todoListArchive", todoID);
            await updateDoc(archiveItemToUpdate, {value: updatedArchiveItem});
        }
        else
        {
            await addDoc (collection(database, "todoListArchive"), {
                authorName: author.currentUser.displayName,
                authorID: author.currentUser.uid,
                date,
                dateStr,
                value: c,
                userDateSearch: userAndDate
            }
            );
        }
    }

    function updateArchive() 
    {
        var tempList = [];
        let tempArchivedTasks = [];
        let tempChecked = [];
        var checkboxes = document.querySelectorAll("input[type=checkbox]");
        var newNumOfTasks = 0;

        if (todoitems.length === 0 || Checked.length === 0 || checkboxes.length === 0)
        {
            return;
        }

        // remove "checked" to-do list tasks from the list
        // add "checked" to-do list tasks to the archive list
        for (let i = 0; i < checkboxes.length; i++)
        {
            if (checkboxes[i].checked === true) // archive list
            {
                tempArchivedTasks.push(todoitems[i]);
            }
            if (checkboxes[i].checked === false) // current to-do list
            {
                tempList.push(todoitems[i]);
                tempChecked.push(Checked[i]);
                newNumOfTasks = newNumOfTasks + 1;
            }
        }
        if (tempArchivedTasks.length !== 0)
        {
            setArchivedTasks(tempArchivedTasks, saveArchiveData(tempArchivedTasks));
        }
        setChecked(tempChecked);
        setToDoItems(tempList, saveTaskData(tempList, tempChecked));
        setNumOfTasks(newNumOfTasks);
    }

    return (
        <div className='todo'>
            <Navigation />
            
            <div className='listTitle'>
                To-Do List! 
            </div>
            <div id={font} className='affirmations'>
                
                You're doing amazing! 
                <br></br>
                Keep trying your best today ʕ•ᴥ•ʔ
                <br></br> 
            </div>
            <div id={font} className='instr'>
                <br></br>
                Only add up to 10 items to help with stress management.
                <br></br>
                To send your checked-off tasks to your completed archive, and remove them 
                <br></br>
                from your current list, click 'Update Archive' below.
                <br></br>
                If you want to remove an item entirely, press 'X'.
                <br></br><br></br>
            </div>
            <div id={font} className='todoWrapper'>
                <div id="newItem">
                    <label>Add a task here:</label>
                    {' '}<input type="text" size="20" id="taskValue" placeholder="To-Do" name="taskValue" className='taskVal'></input>
                    <button onClick={handleTask} className='addButton'>Add</button>
                </div>
                <br></br>
                <ol className='actualList'>
                    {todoitems.map((val, i) => {
                        return (
                            <div id={font} key={val}>
                                <input type="checkbox" onChange={() => handleCheck(val)} id={"check" + i} checked={Checked[i]}></input>
                                {' '}{val} &ensp;
                                <button type="button" onClick={() => handleDelete(val)} className='buttons'> X </button>
                            </div>
                        );
                    })}
                    <br></br>
                    <button type="button" onClick={updateArchive} className='buttonArch'>Update Archive</button>
                </ol>
            </div>
        </div>
    );

}

function convertDateObjectToStr(dateObject)
{
    let day = dateObject.getDate();
    let weekday = dateObject.getDay();
    let month = dateObject.getMonth();
    let year = dateObject.getFullYear();

    let date = "";

    switch (weekday)
    {
        case 0:
            date += "Sunday, ";
            break;
        case 1:
            date += "Monday, ";
            break;
        case 2:
            date += "Tuesday, ";
            break;
        case 3:
            date += "Wednesday, ";
            break;
        case 4:
            date += "Thursday, ";
            break;
        case 5:
            date += "Friday, ";
            break;
        case 6:
            date += "Saturday, ";
            break;
        default:
            break;
    }

    switch (month)
    {
        case 0:
            date += "January ";
            break;
        case 1:
            date += "February ";
            break;
        case 2:
            date += "March" ;
            break;
        case 3:
            date += "April ";
            break;
        case 4:
            date += "May ";
            break;
        case 5:
            date += "June ";
            break;
        case 6:
            date += "July ";
            break;
        case 7:
            date += "August ";
            break;
        case 8:
            date += "September ";
            break;
        case 9:
            date += "October ";
            break;
        case 10:
            date += "November ";
            break;
        case 11:
            date += "December ";
            break;
        default:
            break;
    }

    date += day;
    date += ", ";
    date += year;

    return date;
}

export {convertDateObjectToStr};
export default ToDoList; 