import React, {useState} from 'react';

function WaterTracker()
{
    return(
        <div>
            <header>
                Water Tracker
            </header>
            <div>
                <WaterEntry dateInput={0}/>
            </div>
            <div>
                <WaterEntry dateInput={1}/>
            </div>
            <div>
                <WaterEntry dateInput={2}/>
            </div>
            <div>
                <WaterEntry dateInput={3}/>
            </div>
            <div>
                <WaterEntry dateInput={4}/>
            </div>
            <div>
                <WaterEntry dateInput={5}/>
            </div>
            <div>
                <WaterEntry dateInput={6}/>
            </div>
        </div>
    );
}

function WaterEntry({dateInput})
{
    const [date, setDate] = useState(dateInput);
    const [amount, setAmount] = useState(0);

    let day = new Date();
    day.setDate(day.getDate() - date);

    let dateStr = convertDateObjectToStr(day);
    let entryName = "entry" + date;

    function handleEntry()
    {
        console.log(document.getElementById(entryName));
        let add = parseInt(document.getElementById(entryName).value);
        setAmount(amount + add);
    }

    return(
        <div>
            <div>
                {dateStr}
            </div>
            <div>
                {amount} fluid ounces
            </div>
            <div>
                <input type="text" id={entryName}/>
                <button onClick={handleEntry}>Add</button>
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

export default WaterTracker;