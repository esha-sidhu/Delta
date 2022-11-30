import React, {useEffect, useState} from 'react';
import {Link, } from "react-router-dom";
import ToDoList from "./todo-list";
import Navigation from '../shared/navbar';
import SearchImages from './images';
import { onAuthStateChanged } from 'firebase/auth';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {database, author} from '../../firebase';
import '../../styles/boardstyle.css';

const quotes = {0: 'Never regret anything that made you smile.', 1: 'If you want to love others, you should love yourself first.', 2: 'A beautiful day begins with a beautiful mindset.', 3: 'What makes you happy doesn\'t need to make sense to others.', 4: 'Choose happy!', 5: 'Don\'t forget to smile today :)', 6: 'Do more of what makes you happy.'}
const d = new Date();
let day = d.getDay();

function Board()
{
    const [imageBox1, setImageBox1] = useState("");
    const [authOfImage1, setAuthOfImage1] = useState("");
    const [imageBox2, setImageBox2] = useState("");
    const [authOfImage2, setAuthOfImage2] = useState("");
    const [imageBox3, setImageBox3] = useState("");
    const [authOfImage3, setAuthOfImage3] = useState("");
    const [imageBox4, setImageBox4] = useState("");
    const [authOfImage4, setAuthOfImage4] = useState("");
    const [temp, setTemp] = useState(false);
    const [font, setFont] = useState("font1");
    const [color, setBgColor] = useState("bgcolor1");

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
                const bgcolor_temp = settingsQRes.docs[0]._document.data.value.mapValue.fields.backgroundSet.stringValue;
                setBgColor(bgcolor_temp)
            }
        }
        const retrievePastImageData = async () => {
            if (author.currentUser === null)
            {
                return;
            }
            const user = author.currentUser.uid;
            const imageQ = query(collection(database, "imageData"), where("authorID", "==", user));
            const imageQRes = await getDocs(imageQ);
            if (imageQRes.docs.length !== 0)
            {
                const image1 = imageQRes.docs[0]._document.data.value.mapValue.fields.box1.stringValue;
                const image2 = imageQRes.docs[0]._document.data.value.mapValue.fields.box2.stringValue;
                const image3 = imageQRes.docs[0]._document.data.value.mapValue.fields.box3.stringValue;
                const image4 = imageQRes.docs[0]._document.data.value.mapValue.fields.box4.stringValue;
                const auth1 = imageQRes.docs[0]._document.data.value.mapValue.fields.author1.stringValue;
                const auth2 = imageQRes.docs[0]._document.data.value.mapValue.fields.author2.stringValue;
                const auth3 = imageQRes.docs[0]._document.data.value.mapValue.fields.author3.stringValue;
                const auth4 = imageQRes.docs[0]._document.data.value.mapValue.fields.author4.stringValue;

                setImageBox1(image1);
                setImageBox2(image2);
                setImageBox3(image3);
                setImageBox4(image4);
                setAuthOfImage1(auth1);
                setAuthOfImage2(auth2);
                setAuthOfImage3(auth3);
                setAuthOfImage4(auth4);
            }
        };

        retrievePastImageData();
        retrivePastSettingData();
    }, [temp]);

    function GoToSearchImages1() {
        window.location.assign('/searchImages');
    }

    function GoToSearchImages2() {
        window.location.assign('/searchImages2');
    }

    function GoToSearchImages3() {
        window.location.assign('/searchImages3');
    }

    function GoToSearchImages4() {
        window.location.assign('/searchImages4');
    }

    return (
        <div className={color} style={{height:'130vh'}}>
            <Navigation /> 
            <Link to='/archive' className='archive'>Go to archive</Link>
            <div style={{textAlign:'center', fontSize:'28px', fontFamily:'Times New Roman', fontWeight:'bold'}}>"{quotes[day]}"</div>
            <div className='wrapt'>
            <div className='leftbox'>
                <button className='plus' id='add-image1' onClick={GoToSearchImages1}>+</button><br/>
                <div className='imageBox' id='boxed-image'><img src={imageBox1}/></div>
                <br></br>
                <div className='author-name'>Author: {authOfImage1}</div>
            <br/>
            <br/>
                <button className='plus' id='add-image2' onClick={GoToSearchImages2}>+</button><br/>
                <div className='imageBox' id='boxed-image'><img src={imageBox2}/></div>
                <br></br>
                <div className='author-name'>Author: {authOfImage2}</div>
            </div>
            <ToDoList/>
            <div className='rightbox'>
                <button className='plus' id='add-image3' onClick={GoToSearchImages3}>+</button><br/>
                <div className='imageBox' id='boxed-image'><img src={imageBox3}/></div>
                <br></br>
                <div className='author-name'>Author: {authOfImage3}</div>
            <br/>
            <br/>
                <button className='plus' id='add-image4' onClick={GoToSearchImages4}>+</button><br/>
                <div className='imageBox' id='boxed-image'><img src={imageBox4}/></div>
                <br></br>
                <div className='author-name'>Author: {authOfImage4}</div>
            </div>
            </div>
        </div>
    );
}

export default Board;