import { addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { author, database } from '../../firebase';
import Navigation from '../shared/navbar';
import '../../styles/journal-style.css'

function Journal()
{
    const [temp, setTemp] = useState(false);
    const [saveText1, setSaveText1] = useState("");
    const [saveText2, setSaveText2] = useState("");
    const [saveText3, setSaveText3] = useState("");

    useEffect(() => {
        const retrievePastJournalData = async () => {
            if (author.currentUser === null)
            {
                window.location.assign("/");
            }
            const user = author.currentUser.uid;
            const journalQ = query(collection(database, "journalData"), where("authorID", "==", user));
            const journalQRes = await getDocs(journalQ);
            if (journalQRes.docs.length !== 0)
            {
                const pastText1 = journalQRes.docs[0]._document.data.value.mapValue.fields.textBox1.stringValue;
                const pastText2 = journalQRes.docs[0]._document.data.value.mapValue.fields.textBox2.stringValue;
                const pastText3 = journalQRes.docs[0]._document.data.value.mapValue.fields.textBox3.stringValue;

                setSaveText1(pastText1);
                setSaveText2(pastText2);
                setSaveText3(pastText3);
            }
            else
            {
                
            }
        };

        retrievePastJournalData();
    }, [temp]);

    async function saveJournal(textToSave, textNum)
    {
        const user = author.currentUser.uid;
        const journalQ = query(collection(database, "journalData"), where("authorID", "==", user));
        const journalQRes = await getDocs(journalQ);
        if (journalQRes.docs.length !== 0)
        {
            const journalID = journalQRes.docs[0].id;
            const journalToUpdate = doc(getFirestore(), "journalData", journalID);
            switch (textNum)
            {
                case 1:
                    await updateDoc(journalToUpdate, {textBox1: textToSave});
                    break;
                case 2:
                    await updateDoc(journalToUpdate, {textBox2: textToSave});
                    break;
                case 3:
                    await updateDoc(journalToUpdate, {textBox3: textToSave});
                    break;
                default:
                    break;
            }
        }
        else
        {
            switch (textNum)
            {
                case 1:
                    await addDoc (collection(database, "journalData"), {
                        authorName: author.currentUser.displayName,
                        authorID: author.currentUser.uid,
                        textBox1: textToSave,
                        textBox2: "",
                        textBox3: ""
                    }
                    );
                    break;
                case 2:
                    await addDoc (collection(database, "journalData"), {
                        authorName: author.currentUser.displayName,
                        authorID: author.currentUser.uid,
                        textBox1: "",
                        textBox2: textToSave,
                        textBox3: ""
                    }
                    );
                    break;
                case 3:
                    await addDoc (collection(database, "journalData"), {
                        authorName: author.currentUser.displayName,
                        authorID: author.currentUser.uid,
                        textBox1: "",
                        textBox2: "",
                        textBox3: textToSave
                    }
                    );
                    break;
                default:
                    await addDoc (collection(database, "journalData"), {
                        authorName: author.currentUser.displayName,
                        authorID: author.currentUser.uid,
                        textBox1: "",
                        textBox2: "",
                        textBox3: ""
                    }
                    );
                    break;
            }
        }
    }

function SaveText1()
{
    var text1 = document.getElementById("Text1").value;
    saveJournal(text1, 1);
    setSaveText1(text1);
}

function SaveText2()
{
    var text2 = document.getElementById("Text2").value;
    saveJournal(text2, 2);
    setSaveText2(text2);
}

function SaveText3()
{
    var text3 = document.getElementById("Text3").value;
    saveJournal(text3, 3);
    setSaveText3(text3);
}

    return (
        <div className='page'>
            <Navigation />
            <div className='title3'>
            {'\u2744'} Journal Time {'\u2744'}
            </div>
            <div>
                <br/>
                <div className='entry-type'>What's on your mind...</div>
                <textarea id="Text1" cols="40" rows="5" className='input-one' defaultValue={saveText1}></textarea>
                <button className='save-button' onClick={() => SaveText1()}>Save</button>
                <br/>
                <div className='entry-type'>How are you feeling...</div>
                <textarea id="Text2" cols="40" rows="5" className='input-two' defaultValue={saveText2}></textarea>
                <button className='save-button' onClick={() => SaveText2()}>Save</button>
                <br/>
                <div className='entry-type'>Your quotes collection...</div>
                <textarea id="Text3" cols="40" rows="5" className='input-three' defaultValue={saveText3}></textarea>
                <button className='save-button' onClick={() => SaveText3()}>Save</button>
            </div>
        </div>
    );
}

export default Journal;