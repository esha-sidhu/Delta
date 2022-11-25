import React from 'react';
import {Link} from "react-router-dom";
import '../../styles/journal-style.css'

function SaveText1()
{
    var text1 = document.getElementById("Text1").value;
}

function SaveText2()
{
    var text2 = document.getElementById("Text2").value;
}

function SaveText3()
{
    var text3 = document.getElementById("Text3").value;
}

function Journal()
{
    return (
        <div>
            <div>
                Your journal!
            </div>
            <div>
                <br/>
                <textarea id="Text1" cols="40" rows="5" className='input-one'></textarea>
                <br/>
                <button onClick={() => SaveText1()}>save</button>
                <br/>
                <textarea id="Text2" cols="40" rows="5" className='input-two'></textarea>
                <br/>
                <button onClick={() => SaveText2()}>save</button>
                <br/>
                <textarea id="Text3" cols="40" rows="5" className='input-three'></textarea>
                <br/>
                <button onClick={() => SaveText3()}>save</button>
                <br/>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Journal;