import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import Board from "./board";
import Tracker from "./tracker";
import Journel from "./journal";
import Settings from "./settings";
import SleepTracker from './sleeptracker';

function InitLanding()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element={<Landing />} />
                <Route path = "/signup" element={<SignUp />} />
                <Route path = "/login" element={<LogIn />} />
                <Route path = "/board" element={<Board />} />
                <Route path = "/tracker" element={<Tracker />} />
                <Route path = "/sleeptracker" element={<SleepTracker />} />
                <Route path = "/journel" element={<Journel />} />
                <Route path = "/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}

function Landing()
{
    return (
        <div>
            <div>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default InitLanding;