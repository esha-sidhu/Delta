import React from 'react';
import {Link} from "react-router-dom";
import Navigation from '../shared/navbar';
import '../../styles/trackerstyle.css'

function Tracker()
{
    if (performance.getEntriesByType("navigation")[0].type === "reload")
    {
        window.location.assign("/");
    }

    return (
        <div>
            <Navigation />
            <div className='title5'>
                Your trackers!
            </div>
            <br/>
            <br/>
            <div >
                <Link className='a4' to ="/sleeptracker">Go to Sleep Tracker</Link>
                <br/>
                <br/>
                <br/>
                <Link className='a5' to="/WaterTracker">Go to Water Tracker</Link>
                <br/>
                <br/>
                <br/>
                <Link className='a6' to="/MoodTracker">Go to Mood Tracker</Link>
                <br/>
                <br/>
                <br/>
                <Link className='a7' to="/board">Go back</Link>
            </div>
        </div>
    );
}

export default Tracker;