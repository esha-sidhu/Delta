import {BrowserRouter, Route} from "react-router-dom";

function InitLanding()
{
    return (
        <BrowserRouter>
            <Route path="./components/pages/signup" />
        </BrowserRouter>
    );
}

export default InitLanding;