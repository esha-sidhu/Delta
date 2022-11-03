import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/initlanding"
import SignUp from "./pages/signup"
import LogIn from "./pages/login"

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element={<Landing />} />
                <Route path = "/signup" element={<SignUp />} />
                <Route path = "/login" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;