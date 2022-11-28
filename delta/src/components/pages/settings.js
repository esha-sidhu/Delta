import React from 'react';
import {Link} from "react-router-dom";
import Navigation from '../shared/navbar';

function Settings()
{
    return (
        <div>
            <Navigation />
            <div>
                Settings
            </div>
            <div>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Settings;