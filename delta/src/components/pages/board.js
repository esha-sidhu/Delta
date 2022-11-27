import React from 'react';
import {Link} from "react-router-dom";
import ToDoList from "./todo-list";
// import App from '../App';
import Navigation from './navbar';

function Board()
{
    return (
        <div>
            <Navigation /> 
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
        </div>
    );
}

export default Board;