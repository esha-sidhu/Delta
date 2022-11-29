import React, {useEffect, useState} from 'react';
import {Link, } from "react-router-dom";
import ToDoList from "./todo-list";
// import App from '../App';
import Navigation from './navbar';
import SearchImages from './images';
import { onAuthStateChanged } from 'firebase/auth';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {database, author} from '../../firebase';
import './images.css';

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

    if (performance.getEntriesByType("navigation")[0].type === "reload")
    {
        window.location.assign("/");
    }

    if (!temp)
    {
        onAuthStateChanged(author, () => {
            if (author.currentUser)
            {
                console.log("user found");
                setTemp(true);
            }
        }
        );
    }

    useEffect(() => {
        const retrievePastImageData = async () => {
            if (author.currentUser === null)
            {
                console.log("uid is null");
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
        <div>
            <Navigation /> 
            <div>
                Welcome to your Bulletin Board!
            </div>
            <div>
                <Link to="/tracker">Trackers</Link>
            </div>
            <div>
                <Link to="/journal">Journal</Link>
            </div>
            <div>
                <Link to="/settings">Settings</Link>
            </div>
            <div>
                <Link to="/searchImages">Search Images</Link>
            </div>
            <div>
                <Link to="/">Log Out</Link>
            </div>
            <div>
                <div className='imageBox' id='boxed-image'><img src={imageBox1}/></div>
                <br></br>
                <small>Author: {authOfImage1}</small>
                <br/>
                <button id='add-image1' onClick={GoToSearchImages1}>+</button>
            </div>
            <br/>
            <div>
                <div className='imageBox' id='boxed-image'><img src={imageBox2}/></div>
                <br></br>
                <small>Author: {authOfImage2}</small>
                <br/>
                <button id='add-image2' onClick={GoToSearchImages2}>+</button>
            </div>
            <div>
                <ToDoList/>
            </div>
            <div>
                <div className='imageBox' id='boxed-image'><img src={imageBox3}/></div>
                <br></br>
                <small>Author: {authOfImage3}</small>
                <br/>
                <button id='add-image3' onClick={GoToSearchImages3}>+</button>
            </div>
            <br/>
            <div>
                <div className='imageBox' id='boxed-image'><img src={imageBox4}/></div>
                <br></br>
                <small>Author: {authOfImage4}</small>
                <br/>
                <button id='add-image4' onClick={GoToSearchImages4}>+</button>
            </div>
            <div>
                <Link to="/archive">Archived Tasks</Link>
            </div>
        </div>
    );
}

export default Board;