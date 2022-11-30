import React from "react";
import { Link } from 'react-router-dom';
import '../../styles/nav.css'

function Navigation() {
  return (
    <div className="navStyle">
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li><Link to="/">&#948;elta</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/board">Board</Link></li>
          <li><Link to="/tracker">Trackers</Link></li>
          <li><Link to="/journal">Journal</Link></li>
          <li><Link to="/">Log Out</Link></li>
        </ul>
      </div>
    </nav>
    <br/> <br/> <br/>
    </div>
  );
}

export default Navigation;