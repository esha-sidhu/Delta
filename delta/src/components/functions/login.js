import React, {useState, useEffect} from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsernameIsValid(username.length >= 4);
            setPasswordIsValid(username.length >= 4);

        }, 500)

        return() =>{
            clearTimeout(timer);
        };
    }, [username,password])

    function submitHandler()
    {
        if(usernameIsValid && passwordIsValid) props.loggedInHandler(true);
    }

    function usernameChangedHandler(event)
    {
        setUsername(event.target.value);
    }

    function passwordChangedHandler(event)
    {
        setPassword(event.target.value);
    }

    return (
        <div>
            <input placeholder="Username" value={username} onChange={usernameChangedHandler}></input>
            <br/>
            <input placeholder="Password" value={password} onChange={passwordChangedHandler}></input>
            <br/>
            <button onClick = {submitHandler}>Login</button>
        </div>
    )
}

export default Login;