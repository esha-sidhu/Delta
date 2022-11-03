import React from 'react';
import {Link} from "react-router-dom";

function LogIn()
{
    return (
        <div>
            <div>
                login
            </div>
            <div>
                <Link to="/board">Go to your bulletin board!</Link>
            </div>
        </div>
    );
}

export default LogIn;