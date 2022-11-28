import React from 'react';
import {Link} from "react-router-dom";
import Navigation from './navbar';

function Tracker()
{
    return (
        <div>
            <Navigation />
            <div>
                Your trackers!
            </div>
            <div>
                <Link to ="/sleeptracker">Go to Sleep Tracker</Link>
                <br/>
                <Link to="/WaterTracker">Go to Water Tracker</Link>
                <br/>
                <Link to="/MoodTracker">Go to Mood Tracker</Link>
                <br/>
            </div>
            <div>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Tracker;