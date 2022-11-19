import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {author, googleProvider} from '../../firebase';
import {signInWithPopup} from 'firebase/auth';

function LogIn()
{
    function googleLogIn()
    {
        signInWithPopup(author, googleProvider).then(
            function afterLogIn()
            {
                window.location.assign("/board");
            }
        )
    }

    return (
        <div>
            <div>
                login
            </div>
            <div>
                <button onClick={googleLogIn}>Log In</button>
            </div>
        </div>
    );
}

export default LogIn;