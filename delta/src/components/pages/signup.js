import React from 'react';
import {Link} from "react-router-dom"


function SignUp()
{
    return (
        <div>
            <div>
                signup
            </div>
            <div>
                <Link to="/board">Make your bulletin board!</Link>
            </div>
        </div>
    );
}

export default SignUp;