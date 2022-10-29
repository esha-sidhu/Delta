import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import SignUp from "./signup"
import LogIn from "./login"

function InitLanding()
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