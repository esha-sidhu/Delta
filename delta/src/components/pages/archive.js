import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {convertDateObjectToStr} from './todo-list';

function ArchiveSearch()
{
    const [temp, setTemp] = useState(false);
    const [invalidSearch, setInvalidSearch] = useState("");
    const [todoEntries, setTodoEntries] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const retrievePastTodoData = async () => {
        if (author.currentUser === null)
        {
            console.log("uid is null");
            window.location.assign("/");
        }

        const user = author.currentUser.uid;
        const todoQ = query(collection(database, "todoListArchive"), where("authorID", "==", user), orderBy("date"));
        const todoQRes = await getDocs(todoQ);
        const len = todoQRes.docs.length;
        console.log("len");
        console.log(len);
        let tempTodoEntries = [];

        if (len > 0)
        {
            let firstDate = todoQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
            firstDate = new Date(firstDate);
            let lastDate = todoQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
            lastDate = new Date(lastDate);

            setMinDate(`${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`);
            setMaxDate(`${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`);

            let j = len - 1;
            for (let i = lastDate; i >= firstDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                const dateFromDatabse = todoQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                if (date === dateFromDatabse)
                {
                    const amount = todoQRes.docs[j]._document.data.value.mapValue.fields.value.arrayValue.values;
                    tempTodoEntries.push(
                        {dateEntry: dateFromDatabse, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    const amount = [{stringValue: "No tasks have been completed today!"}];
                    tempTodoEntries.push(
                        {dateEntry: date, amountEntry: amount}
                    );
                }
            }
        }
        else
        {
            const date = new Date();
            date.setHours(0, 0, 0, 0);

            setMinDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
            setMaxDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

            const dateStr = convertDateObjectToStr(date);

            const amount = [{stringValue: "No tasks have been completed today!"}];
            tempTodoEntries.push(
                {dateEntry: dateStr, amountEntry: amount}
            );
        }

        setTodoEntries(tempTodoEntries);
        console.log(tempTodoEntries);
    };

    retrievePastTodoData();
    }, [temp]);

    async function handleSearch()
    {
        let start = document.getElementById("start").value + "T00:00:00";
        let end = document.getElementById("end").value + "T00:00:00";

        console.log(start);
        console.log(end);

        let startDate;
        let endDate;

        if (start !== "T00:00:00")
        {
            startDate = new Date(start);
        }
        if (end !== "T00:00:00")
        {
            endDate = new Date(end);
        }

        if (start === "T00:00:00" || end === "T00:00:00")
        {
            if (author.currentUser === null)
            {
                console.log("uid is null");
                window.location.assign("/");
            }
            const user = author.currentUser.uid;
            const todoQ = query(collection(database, "todoListArchive"), where("authorID", "==", user), orderBy("date"));
            const todoQRes = await getDocs(todoQ);
            const len = todoQRes.docs.length;
            console.log("archive len:");
            console.log(len);
            if (len > 0)
            {
                if (start === "T00:00:00")
                {
                    startDate = todoQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
                    console.log("archive startDate:");
                    console.log(startDate);
                    startDate = new Date(startDate);
                }
                if (end === "T00:00:00")
                {
                    endDate = todoQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
                    console.log("archive endDate:");
                    console.log(endDate);
                    endDate = new Date(endDate);
                }
            }
            else
            {
                let date = new Date();
                date.setHours(0, 0, 0, 0);
                startDate = date;
                endDate = date;
            }
        }

        console.log(startDate);
        console.log(endDate);

        if (startDate > endDate)
        {
            setInvalidSearch("Invalid Range");
            return;
        }
        else
        {
            setInvalidSearch("");
        }

        if (author.currentUser === null)
        {
            console.log("uid is null");
            window.location.assign("/");
        }
        const user = author.currentUser.uid;
        const todoQ = query(collection(database, "todoListArchive"), where("authorID", "==", user), where("date", ">=", startDate), where("date", "<=", endDate), orderBy("date"));
        const todoQRes = await getDocs(todoQ);
        const len = todoQRes.docs.length;
        let tempTodoEntries = [];
        if (len > 0)
        {
            let j = len - 1;
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                let dateFromDatabase = "";
                if (j >= 0)
                {
                    dateFromDatabase = todoQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                }
               
                if (date === dateFromDatabase)
                {
                    const amount = todoQRes.docs[j]._document.data.value.mapValue.fields.value.arrayValue.values;
                    tempTodoEntries.push(
                        {dateEntry: dateFromDatabase, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    const amount = [];
                    tempTodoEntries.push(
                        {dateEntry: date, amountEntry: amount}
                    );
                }
            }
        }
        else
        {
            const amount = [{stringValue: "No tasks have been completed today!"}];
            const date = convertDateObjectToStr(endDate);
            tempTodoEntries.push(
                {dateEntry: date, amountEntry: amount}
            );
        }

        setTodoEntries(tempTodoEntries);
        console.log(tempTodoEntries);
    }

    return(
        <div>
            <h1>
                Archived Tasks
            </h1>
            <h2>
                Search through past completed todo list tasks
            </h2>
            <div>
                <div>
                    Start Date:
                    <input type="date" min={minDate} max={maxDate} id="start"/>
                </div>
                <div>
                    End Date:
                    <input type="date" min={minDate} max={maxDate} id="end"/>
                </div>
                <button onClick={handleSearch}>Search</button>
                {invalidSearch}
            </div>
            <div>
                {todoEntries.map(({dateEntry, amountEntry}) => {
                    return (
                    <div key={dateEntry}>
                        <div>
                            {dateEntry}
                        </div>
                        <div>
                            {amountEntry.map((item, i) => {
                                return (
                                    <div key={item.stringValue + i}>
                                        &emsp;&#x2022; {item.stringValue}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ArchiveSearch;