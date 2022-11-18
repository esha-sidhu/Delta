import React, {useState} from 'react';

function MoodTracker()
{
    return(
        <div>
            <header>
                Mood Tracker
            </header>
            <div>
                <MoodEntry dateInput={0}/>
            </div>
            <div>
                <MoodEntry dateInput={1}/>
            </div>
            <div>
                <MoodEntry dateInput={2}/>
            </div>
            <div>
                <MoodEntry dateInput={3}/>
            </div>
            <div>
                <MoodEntry dateInput={4}/>
            </div>
            <div>
                <MoodEntry dateInput={5}/>
            </div>
            <div>
                <MoodEntry dateInput={6}/>
            </div>
        </div>
    );
}

function MoodEntry({dateInput})
{
    const [date, setDate] = useState(dateInput);
    const [amount, setAmount] = useState("-");

    let day = new Date();
    day.setDate(day.getDate() - date);

    let dateStr = convertDateObjectToStr(day);
    let entryName = "entry" + date;

    function handleEntry()
    {
        let input = document.getElementById(entryName);
        console.log(input.value);
        setAmount(input.value);
    }

    return(
        <div>
            <div>
                {dateStr}
            </div>
            <div>
                {amount}
            </div>
            <div>
                <select id={entryName}>
                    <option value="-">-</option>
                    <option value="Excited">Excited</option>
                    <option value="Happy">Happy</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Sad">Sad</option>
                    <option value="Stressed">Stressed</option>
                </select>
                <button onClick={handleEntry}>Change</button>
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

export default MoodTracker;