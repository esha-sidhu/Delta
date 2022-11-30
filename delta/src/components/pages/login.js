import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {author, googleProvider} from '../../firebase';
import {signInWithPopup} from 'firebase/auth';
import '../../styles/loginstyle.css'

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
        <div className='login'>
            <div className='padding'></div>
            <div className='loginBlock'>
                <div className='titleBear'>
                    <span className='bear'>
                        ʕ•ᴥ•ʔ
                    </span>
                    <span className='delta'>
                        &ensp;&#948;elta&ensp;
                    </span>
                    <span className='bear'>
                        ʕ•ᴥ•ʔ
                    </span>
                </div>
                <br></br>
                <div className='instr2'>
                    Make that change in your life!
                    <br></br>
                </div>
                <div className='instr3'>
                    Sign in with your Google account
                </div>
                <br></br>
                <div>
                    <button onClick={googleLogIn} className='signInButton'>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default LogIn;