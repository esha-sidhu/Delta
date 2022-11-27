import React from 'react';
import {Link} from "react-router-dom";
import ToDoList from "./todo-list";

function Board()
{
    return (
        <div>
            <div>
                Welcome to your Bulletin Board!
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
            <div>
                <ToDoList/>
            </div>
            <div>
                <Link to="/archive">Archived Tasks</Link>
            </div>
        </div>
    );
}

export default Board;