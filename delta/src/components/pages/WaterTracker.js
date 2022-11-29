import React, {useEffect, useState} from 'react';
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {Link} from "react-router-dom";
import Navigation from '../shared/navbar';
import '../../styles/watertrackerstyle.css'

function WaterTracker()
{
    return(
        <div className='page'>
            <Navigation />
            
            <div className='wrap-top'>
            <div className='title1'>
                Water Tracker
            </div>
                <Link className='a1' to="/WaterTrackerSearch">Search Past Entries</Link>
            </div>
            <br/>
            <br/>

            <div className='wrap1'>

            <div className='box1'>
                <WaterEntry dateInput={0}/>
            </div>

            <div className='box1'>
                <WaterEntry dateInput={1}/>
            </div>

            <div className='box1'>
                <WaterEntry dateInput={2}/>
            </div>

            </div>

            <div className='wrap1'>

            <div className='box1'>
                <WaterEntry dateInput={3}/>
            </div>

            <div className='box1'>
                <WaterEntry dateInput={4}/>
            </div>

            <div className='box1'>
                <WaterEntry dateInput={5}/>
            </div>

            </div>

            <div className='wrap-two1'>

            <div className='box1'>
                <WaterEntry dateInput={6}/>
            </div>
            </div>
        </div>
    );
}

function WaterEntry({dateInput})
{
    const [temp, setTemp] = useState(false);
    const [dateNum, setDateNum] = useState(dateInput);
    const [amount, setAmount] = useState(0);

    let date = new Date();
    date.setDate(date.getDate() - dateNum);
    date.setHours(0, 0, 0, 0);

    let dateStr = convertDateObjectToStr(date);
    let entryName = "entry" + dateNum;
    let change = 0;

    useEffect(() => {
        const retrieveWaterData = async () => {
        if (author.currentUser === null)
        {
            console.log("uid is null");
            window.location.assign("/login");
        }
        const userAndDate = author.currentUser.uid + dateStr;
        const waterQ = query(collection(database, "waterData"), where("userDateSearch", "==", userAndDate));
        const waterQRes = await getDocs(waterQ);
        console.log(waterQRes);
        if (waterQRes.docs.length !== 0)
        {
            setAmount(waterQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue);
        }
        else
        {
            setAmount(0);
        }
    };

    retrieveWaterData();
    }, [temp]);

    function handleEntry()
    {
        let input = document.getElementById(entryName);
        console.log(input);
        change = parseInt(input.value);
        if (isNaN(change) || isNaN(input.value) || input.value.indexOf(".") !== -1 || change <= 0)
        {
            console.log("invalid input");
        }
        else
        {
            console.log(change);
            setAmount((change), saveWaterData(change));
        }
    }

    async function saveWaterData(c)
    {
        const userAndDate = author.currentUser.uid + dateStr;
        const waterQ = query(collection(database, "waterData"), where("userDateSearch", "==", userAndDate));
        const waterQRes = await getDocs(waterQ);
        if (waterQRes.docs.length !== 0)
        {
            const waterID = waterQRes.docs[0].id;
            const trackerToUpdate = doc(getFirestore(), "waterData", waterID);
            await updateDoc(trackerToUpdate, {value: c});
        }
        else
        {
            await addDoc (collection(database, "waterData"), {
                authorName: author.currentUser.displayName, 
                authorID: author.currentUser.uid, 
                date,
                dateStr,
                value: change,
                userDateSearch: userAndDate
            }
            );
        }
    }

    return(
        <div>
            <div className='date'>
                {dateStr}
            </div>
            <div className='amount'>
                {amount} fluid ounces
            </div>
            <div className='input'>
                <input type="text" placeholder="Input positive whole number" size="30" id={entryName}/>
                <br/>
                <br/>
                <button className='button1' onClick={handleEntry}>Log</button>
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
export default WaterTracker;