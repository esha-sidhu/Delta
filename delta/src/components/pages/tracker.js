import React from 'react';
import {Link} from "react-router-dom";

function Tracker()
{
    return (
        <div>
            <div>
                Your trackers!
            </div>
            <div>
                <Link to ="/sleeptracker">Go to Sleep Tracker</Link>
                <Link to="/WaterTracker">Water Tracker</Link>
            </div>
            <div>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Tracker;