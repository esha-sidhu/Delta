import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">Delta</a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/board">Board</Link></li>
          <li><Link to="/tracker">Trackers</Link></li>
          <li><Link to="/journal">Journal</Link></li>
          <li><Link to="/login">Log Out</Link></li>
        </ul>
      </div>
    </nav>
    <br/> <br/> <br/>
    </div>
  );
}

/*
const Navigation = () => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/settings">Settings</Nav.Link>
            <Nav.Link href="/tracker">Trackers</Nav.Link>
            <Nav.Link href="/journal">Journel</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
*/

export default Navigation;