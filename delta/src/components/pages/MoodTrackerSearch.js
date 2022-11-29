import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {convertDateObjectToStr} from './MoodTracker';
import {Link} from 'react-router-dom'
import '../../styles/moodtrackersearchstyle.css'

function MoodTrackerSearch()
{
    const [temp, setTemp] = useState(false);
    const [invalidSearch, setInvalidSearch] = useState("");
    const [moodEntries, setMoodEntries] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const retrievePastMoodData = async () => {
        if (author.currentUser === null)
        {
            console.log("uid is null");
            window.location.assign("/login");
        }

        const user = author.currentUser.uid;
        const moodQ = query(collection(database, "moodData"), where("authorID", "==", user), orderBy("date"));
        const moodQRes = await getDocs(moodQ);
        const len = moodQRes.docs.length;
        let tempMoodEntries = [];

        if (len > 0)
        {
            let firstDate = moodQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
            firstDate = new Date(firstDate);
            let lastDate = moodQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
            lastDate = new Date(lastDate);

            setMinDate(`${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`);
            setMaxDate(`${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`);

            let j = len - 1;
            for (let i = lastDate; i >= firstDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                const dateFromDatabse = moodQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                if (date === dateFromDatabse)
                {
                    const amount = moodQRes.docs[j]._document.data.value.mapValue.fields.value.stringValue;
                    tempMoodEntries.push(
                        {dateEntry: dateFromDatabse, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempMoodEntries.push(
                        {dateEntry: date, amountEntry: "-"}
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

            tempMoodEntries.push(
                {dateEntry: dateStr, amountEntry: "-"}
            );
        }

        setMoodEntries(tempMoodEntries);
        console.log(tempMoodEntries);
    };

    retrievePastMoodData();
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
            const moodQ = query(collection(database, "moodData"), where("authorID", "==", user), orderBy("date"));
            const moodQRes = await getDocs(moodQ);
            const len = moodQRes.docs.length;
            if (len > 0)
            {
                if (start === "T00:00:00")
                {
                    startDate = moodQRes.docs[0]._document.data.value.mapValue.fields.date.timestampValue;
                    startDate = new Date(startDate);
                }
                if (end === "T00:00:00")
                {
                    endDate = moodQRes.docs[len-1]._document.data.value.mapValue.fields.date.timestampValue;
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
        const moodQ = query(collection(database, "moodData"), where("authorID", "==", user), where("date", ">=", startDate), where("date", "<=", endDate), orderBy("date"));
        const moodQRes = await getDocs(moodQ);
        const len = moodQRes.docs.length;
        let tempMoodEntries = [];
        if (len > 0)
        {
            let j = len - 1;
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                let dateFromDatabase = "";
                if (j >= 0)
                {
                    dateFromDatabase = moodQRes.docs[j]._document.data.value.mapValue.fields.dateStr.stringValue;
                }
               
                if (date === dateFromDatabase)
                {
                    const amount = moodQRes.docs[j]._document.data.value.mapValue.fields.value.stringValue;
                    tempMoodEntries.push(
                        {dateEntry: dateFromDatabase, amountEntry: amount}
                    );
                    j--;
                }
                else
                {
                    tempMoodEntries.push(
                        {dateEntry: date, amountEntry: "-"}
                    );
                }
            }
        }
        else
        {
            for (let i = endDate; i >= startDate; i.setDate(i.getDate() - 1))
            {
                const date = convertDateObjectToStr(i);
                tempMoodEntries.push(
                    {dateEntry: date, amountEntry: "-"}
                );
            }
        }

        setMoodEntries(tempMoodEntries);
        console.log(tempMoodEntries);
    }

    return(
        <div className='page'>
            <div className='title2'>
                Your Past Moods
            </div>
            <br/>
            <Link className='a2' to='/moodtracker'>Go Back</Link>
            <div>
                <br/>
                <div className='wrap-top3'>
                <div className='box5'>
                <div className='text'> Start Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="start"/>
                    </div>
                </div>
                <div className='box5'>
                    <div className='text'> End Date : {' '}
                    <input className='input-search' onKeyDown={(e) => e.preventDefault()} type="date" min={minDate} max={maxDate} id="end"/>
                    </div>
                </div>
                <button className='button5' onClick={handleSearch}>Search</button>
                <div className='invalid'>{invalidSearch}</div>
            </div>
            </div>
            <div>
                {moodEntries.map(({dateEntry, amountEntry}) => {
                    return (
                    <div className='data-box2' key={dateEntry}>
                        <div className='data'>
                            {dateEntry}
                        </div>
                        <div className='moods'>
                            {amountEntry}
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MoodTrackerSearch;