import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import LogIn from "./components/pages/login";
import Board from "./components/pages/board";
import ArchiveSearch from './components/pages/archive';
import Tracker from "./components/pages/tracker";
import Journal from "./components/pages/journal";
import Settings from "./components/pages/settings";
import SleepTracker from './components/pages/sleeptracker';
import SleepTrackerSearch from './components/pages/SleepTrackerSearch';
import WaterTracker from "./components/pages/WaterTracker";
import WaterTrackerSearch from "./components/pages/WaterTrackerSearch";
import MoodTracker from "./components/pages/MoodTracker";
import MoodTrackerSearch from './components/pages/MoodTrackerSearch';
import SearchImages from './components/pages/images';
import SearchImages2 from './components/pages/images2';
import SearchImages3 from './components/pages/images3';
import SearchImages4 from './components/pages/images4';
import './styles/appstyle.css'

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element={<Landing />} />
                <Route path = "/login" element={<LogIn />} />
                <Route path = "/board" element={<Board />} />
                <Route path = "/archive" element={<ArchiveSearch />} />
                <Route path = "/tracker" element={<Tracker />} />
                <Route path = "/sleeptracker" element={<SleepTracker />} />
                <Route path = "/SleepTrackerSearch" element={<SleepTrackerSearch/>}/>
                <Route path = "/journal" element={<Journal />} />
                <Route path = "/settings" element={<Settings />} />
                <Route path = "/WaterTracker" element={<WaterTracker />} />
                <Route path = "/WaterTrackerSearch" element={<WaterTrackerSearch/>}/>
                <Route path = "/MoodTracker" element={<MoodTracker />} />
                <Route path = "/MoodTrackerSearch" element={<MoodTrackerSearch/>}/>
                <Route path='/searchImages' element={<SearchImages/>}/>
                <Route path='/searchImages2' element={<SearchImages2/>}/>
                <Route path='/searchImages3' element={<SearchImages3/>}/>
                <Route path='/searchImages4' element={<SearchImages4/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function Landing()
{
    return (
        <div>
            <Link className='a8' to="/login">Log In</Link>
        </div>
    );
}

export default App;