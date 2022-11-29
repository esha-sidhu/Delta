import React from 'react';
import {Link} from "react-router-dom";
import Navigation from '../shared/navbar';
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';

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
          backgroundSet: ""
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
          fontSet: "",
          backgroundSet: color
        }
        );
      }
}

function Settings()
{
    return (
        <div>
            <Navigation />
            <div>
                Settings
            </div>
            <div>
                <button onClick={() => setfont('font1')}>font1</button>
                <button onClick={() => setfont('font2')}>font2</button>
                <button onClick={() => setfont('font3')}>font3</button>
                <button onClick={() => setbgcolor('bgcolor1')}>bgcolor1</button>
                <button onClick={() => setbgcolor('bgcolor2')}>bgcolour2</button>
                <button onClick={() => setbgcolor('bgcolor3')}>bgcolour3</button>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Settings;