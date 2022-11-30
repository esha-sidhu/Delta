import React from 'react';
import {Link} from "react-router-dom";
import Navigation from '../shared/navbar';
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';
import '../../styles/settings.css'

async function setfont(font)
{
    const user = author.currentUser.uid;
    const settingsQ = query(collection(database, "settingsData"), where("authorID", "==", user));
    const settingsQRes = await getDocs(settingsQ);
    if (settingsQRes.docs.length !== 0)
      {
        const settingsID = settingsQRes.docs[0].id;
        const settingToUpdate = doc(getFirestore(), "settingsData", settingsID);
        await updateDoc(settingToUpdate, {fontSet: font});
      }
      else
      {
        await addDoc (collection(database, "settingsData"), {
          authorName: author.currentUser.displayName,
          authorID: author.currentUser.uid,
          fontSet: font,
          backgroundSet: "bgcolor1"
        }
        );
      }
}

async function setbgcolor(color)
{
    const user = author.currentUser.uid;
    const settingsQ = query(collection(database, "settingsData"), where("authorID", "==", user));
    const settingsQRes = await getDocs(settingsQ);
    if (settingsQRes.docs.length !== 0)
      {
        const settingsID = settingsQRes.docs[0].id;
        const settingToUpdate = doc(getFirestore(), "settingsData", settingsID);
        await updateDoc(settingToUpdate, {backgroundSet: color});
      }
      else
      {
        await addDoc (collection(database, "settingsData"), {
          authorName: author.currentUser.displayName,
          authorID: author.currentUser.uid,
          fontSet: "font1",
          backgroundSet: color
        }
        );
      }
}

function Settings()
{
  if (performance.getEntriesByType("navigation")[0].type === "reload")
    {
        window.location.assign("/");
    }

    return (
        <div className='page'>
            <Navigation />
            <div className='title6'>
                Settings
            </div>
            <br/>
            <br/>
            <div>
                <div className='wrap-style-buttons'>
                <button className='font-button' onClick={() => setfont('font1')}>Font 1<br/><br/><div id='font1' >Sample: Make that change in your life!</div></button>
                <button className='font-button' onClick={() => setfont('font2')}>Font 2<br/><br/><div id='font2' >Sample: Make that change in your life!</div></button>
                <button className='font-button' onClick={() => setfont('font3')}>Font 3<br/><br/><div id='font3' >Sample: Make that change in your life!</div></button>
                <button className='font-button' onClick={() => setfont('font4')}>Font 4<br/><br/><div id='font4' >Sample: Make that change in your life!</div></button>
                <button className='font-button' onClick={() => setfont('font5')}>Font 5<br/><br/><div id='font5' >Sample: Make that change in your life!</div></button>
                </div>
                <br/>
                <br/>
                <div className='wrap-style-buttons'>
                <button className='bg-button' id='bgcolor1' onClick={() => setbgcolor('bgcolor1')}>Background Color 1</button>
                <button className='bg-button' id='bgcolor2' onClick={() => setbgcolor('bgcolor2')}>Background Color 2</button>
                <button className='bg-button' id='bgcolor3' onClick={() => setbgcolor('bgcolor3')}>Background Color 3</button>
                <button className='bg-button' id='bgcolor4' onClick={() => setbgcolor('bgcolor4')}>Background Color 4</button>
                <button className='bg-button' id='bgcolor5' onClick={() => setbgcolor('bgcolor5')}>Background Color 5</button>
                </div>
                <br/>
                <br/>
                <br/>
                <Link className='a9' to="/board">Go back</Link>
            </div>
        </div>
    );
}

export default Settings;