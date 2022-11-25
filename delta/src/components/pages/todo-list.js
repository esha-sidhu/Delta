import React, {useEffect, useState} from 'react';


function ToDoList()
{
    const [todoitems, setToDoItems] = useState([]);
    const [numOfTasks, setNumOfTasks] = useState(0);
    const taskMax = 10;
    const [archivedTasks, setArchivedTasks] = useState([]);

    function handleTask()
    {
        let val = document.getElementById("taskValue").value;
        
        // adds inputed task to the to-do list if not a repeat and there
            // are less than the max number of tasks
        if (todoitems.includes(val) === false && val !== '' 
            && numOfTasks < taskMax) 
        {   
            todoitems.push(val);
            setToDoItems(todoitems);
            setNumOfTasks(numOfTasks + 1);

            console.log(numOfTasks);
            console.log(todoitems);
        }
        document.getElementById("taskValue").value = ''; // clears input box
    }

    function handleCheck(val)
    {
        // TODO: can update to do strikethrough/other styling here later
        console.log("checked");
    }

    function handleDelete(val)
    {
        var copiedList = [];
        const indexOfClick = todoitems.indexOf(val);

        // copies all except the 'X' task from the current to-do list
            // into a new list (essentially removing the one task)
        for (let i = 0; i < todoitems.length; i++)
        {
            if (i !== indexOfClick)
            {
                copiedList.push(todoitems[i]);
            }
        }
        setToDoItems(copiedList);
        setNumOfTasks(numOfTasks - 1);
    }

    function updateArchive() 
    {
        var tempList = [];
        var checkboxes = document.querySelectorAll("input[type=checkbox]");
        var newNumOfTasks = 0;
        console.log(numOfTasks);

        // remove "checked" to-do list tasks from the list
        // add "checked" to-do list tasks to the archive list
        for (let i = 0; i < checkboxes.length; i++)
        {
            if (checkboxes[i].checked === true) // archive list
            {
                archivedTasks.push(todoitems[i]);
            }
            if (checkboxes[i].checked === false) // current to-do list
            {
                tempList.push(todoitems[i]);
                newNumOfTasks = newNumOfTasks + 1;
            }
        }
        setArchivedTasks(archivedTasks);
        setToDoItems(tempList);
        setNumOfTasks(newNumOfTasks);

        console.log(archivedTasks);
        console.log(numOfTasks);
    }


    return (
        <div>
            <div>
                <br></br>
                <font size="6">
                    To-Do List! 
                </font>
                <font size="3">
                    <br></br><br></br>
                    You're doing amazing! 
                    <br></br>
                    Keep trying your best today ʕ•ᴥ•ʔ
                    <br></br> 
                </font>
                <font size="1">
                    Only add up to 10 items to help with stress management.
                    <br></br>
                    To send your checked-off tasks to your completed archive, and remove them from your current list, click 'Update Archive' below.
                    <br></br><br></br>
                </font>
                <div id="newItem">
                    <label>Add a task here:</label>
                    <input type="text" size="20" id="taskValue" placeholder="To-Do" name="taskValue"></input>
                    <button onClick={handleTask}>Add</button>
                </div>
            </div>
            <ol>
                {todoitems.map((val) => {
                    return (
                        <div key={val}>
                            <input type="checkbox" onClick={() => handleCheck(val)}></input>
                            {val} &ensp;
                            <button type="button" onClick={() => handleDelete(val)}> X </button>
                        </div>
                    );
                })}
                <br></br>
                <button type="button" onClick={updateArchive}>Update Archive</button>
            </ol>
        </div>
    );

}

export default ToDoList; 