import React from 'react';
import {Link} from "react-router-dom";

function Settings()
{
    return (
        <div>
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