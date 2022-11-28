import React from 'react';
import {Link, } from "react-router-dom";
import ToDoList from "./todo-list";
// import App from '../App';
import Navigation from './navbar';
import SearchImages from './images';

function Board()
{
    function GoToSearchImages1() {
        window.location.assign('/searchImages');
    }

    function GoToSearchImages2() {
        window.location.assign('/searchImages2');
    }

    function GoToSearchImages3() {
        window.location.assign('/searchImages3');
    }

    function GoToSearchImages4() {
        window.location.assign('/searchImages4');
    }

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
                <Link to="/searchImages">Search Images</Link>
            </div>
            <div>
                <Link to="/">Log Out</Link>
            </div>
            <div>
                <button className='imageBox' id='box1'></button>
                <br/>
                <button id='add-image1' onClick={GoToSearchImages1}>+</button>
            </div>
            <br/>
            <div>
                <button className='imageBox' id='box2'></button>
                <br/>
                <button id='add-image2' onClick={GoToSearchImages2}>+</button>
            </div>
            <div>
                <ToDoList/>
            </div>
            <div>
                <button className='imageBox' id='box3'></button>
                <br/>
                <button id='add-image3' onClick={GoToSearchImages3}>+</button>
            </div>
            <br/>
            <div>
                <button className='imageBox' id='box4'></button>
                <br/>
                <button id='add-image4' onClick={GoToSearchImages4}>+</button>
            </div>
            <div>
                <Link to="/archive">Archived Tasks</Link>
            </div>
        </div>
    );
}

export default Board;