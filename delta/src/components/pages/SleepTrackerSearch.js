import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {day_convert, month_convert} from './sleeptracker';
import '../../styles/sleeptrackersearchstyle.css'
import {Link} from 'react-router-dom'

function SleepTrackerSearch()
{
    const [temp, setTemp] = useState(false);
    const [invalidSearch, setInvalidSearch] = useState("");
    const [sleepEntries, setSleepEntries] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const retrievePastSleepData = async () => {
        if (author.currentUser === null)
        {
            console.log("uid is null");
            window.location.assign("/login");
        }

        const user = author.currentUser.uid;
        const sleepQ = query(collection(database, "sleepData"), where("authorID", "==", user), orderBy("date"));
        const sleepQRes = await getDocs(sleepQ);
        const len = sleepQRes.docs.length;
        let tempSleepEntries = [];

        if (len > 0)
        {
            let firstDate = sleepQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
            firstDate = new Date(firstDate);
            let lastDate = sleepQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
            lastDate = new Date(lastDate);

            setMinDate(`${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`);
            setMaxDate(`${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`);

            let j = len - 1;
            for (let i = lastDate; i >= firstDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                const dateFromDatabse = sleepQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                if (date === dateFromDatabse)
                {
                    const amount = sleepQRes.docs[j]._document.data.value.mapValue.fields.value.integerValue;
                    tempSleepEntries.push(
                        {dateEntry: dateFromDatabse, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempSleepEntries.push(
                        {dateEntry: date, amountEntry: 0}
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

            tempSleepEntries.push(
                {dateEntry: dateStr, amountEntry: 0}
            );
        }

        setSleepEntries(tempSleepEntries);
        console.log(tempSleepEntries);
    };

    retrievePastSleepData();
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
            const sleepQ = query(collection(database, "sleepData"), where("authorID", "==", user), orderBy("date"));
            const sleepQRes = await getDocs(sleepQ);
            console.log(sleepQRes);
            const len = sleepQRes.docs.length;
            if (len > 0)
            {
                if (start === "T00:00:00")
                {
                    startDate = sleepQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
                    startDate = new Date(startDate);
                }
                if (end === "T00:00:00")
                {
                    endDate = sleepQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
                    endDate = new Date(endDate);
                }
            }
            else
            {
                if (start === "T00:00:00")
                {
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0);
                }
                if (end === "T00:00:00")
                {
                    endDate = new Date();
                    endDate.setHours(0, 0, 0, 0);
                }
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
        const sleepQ = query(collection(database, "sleepData"), where("authorID", "==", user), where("date", ">=", startDate), where("date", "<=", endDate), orderBy("date"));
        const sleepQRes = await getDocs(sleepQ);
        const len = sleepQRes.docs.length;
        let tempSleepEntries = [];
        if (len > 0)
        {
            let j = len - 1;
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                let dateFromDatabase = "";
                if (j >= 0)
                {
                    dateFromDatabase = sleepQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                }
               
                if (date === dateFromDatabase)
                {
                    const amount = sleepQRes.docs[j]._document.data.value.mapValue.fields.value.integerValue;
                    tempSleepEntries.push(
                        {dateEntry: dateFromDatabase, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempSleepEntries.push(
                        {dateEntry: date, amountEntry: 0}
                    );
                }
            }
        }
        else
        {
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                tempSleepEntries.push(
                    {dateEntry: date, amountEntry: 0}
                );
            }
        }

        setSleepEntries(tempSleepEntries);
        console.log(tempSleepEntries);
    }

    return(
        <div className='page'>
            <div className='title'>
                Your Sleep Data
            </div>
            <br/>
            <Link className='a' to='/sleeptracker'>Go Back</Link>
            <div>
                <br/>
                <div className='wrap-top3'>
                <div className='box3'>
                    <div className='text'> Start Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="start"/>
                    </div>
                </div>
                <div className='box3'>
                    <div className='text'> End Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="end"/>
                    </div>
                </div>
                <div>
                <button className='button3' onClick={handleSearch}>Search</button>
                </div>
                <div className='invalid'>{invalidSearch}</div>
            </div>
            </div>
            <div>
                {sleepEntries.map(({dateEntry, amountEntry}) => {
                    return (
                    <div className='data-box' key={dateEntry}>
                        <div className='data'>
                            {dateEntry}
                        </div>
                        <div className='hours'>
                            {amountEntry} hours
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

function convertDateObjectToStr(dateObject)
{
    return `${day_convert[dateObject.getDay()]}, ${dateObject.getDate()} ${month_convert[dateObject.getMonth()]} ${dateObject.getFullYear()}`
}

export default SleepTrackerSearch;