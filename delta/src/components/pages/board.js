import React from 'react';
import {Link} from "react-router-dom";

function Board()
{
    return (
        <div>
            <div>
                bulletin board
            </div>
            <div>
                <Link to="/tracker">Trackers</Link>
            </div>
            <div>
                <Link to="/journal">Journal</Link>
            </div>
            <div>
                <Link to="/settings">Settings</Link>
            </div>
            <div>
                <Link to="/">Log Out</Link>
            </div>
        </div>
    );
}

export default Board;