import React from 'react';
import {Link} from "react-router-dom";
import '../../styles/journal-style.css'

function Journal()
{
    return (
        <div>
            <div>
                Your journal!
            </div>
            <div>
                <br/>
                <input type="text" className='input-one'></input>
                <br/>
                <br/>
                <input type="text" className='input-two'></input>
                <br/>
                <br/>
                <input type="text" className='input-three'></input>
                <br/>
                <br/>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Journal;