import React from 'react';
import {Link} from "react-router-dom";

function Journel()
{
    return (
        <div>
            <div>
                Your journel!
            </div>
            <div>
                <Link to="/board">Go back to your bulletin board</Link>
            </div>
        </div>
    );
}

export default Journel;