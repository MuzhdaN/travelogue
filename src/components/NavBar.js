import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from "../assets/logo.png"
import navStyles from  "../styles/NavBar.module.css"
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../App';


const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink 
        className={navStyles.NavLink} 
        activeClassName={navStyles.Active} 
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
       className={navStyles.NavLink} 
        activeClassName={navStyles.Active} 
        to="/signup"
      >
         Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={navStyles.NavBar} expand="md" fixed='top'>
      <Container>
        <Navbar.Brand>
            <img src={logo} alt="logo" height="50" className="me-2" />
            <span className="mt-1">Travelogue</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink 
                exact 
                className={navStyles.NavLink} 
                activeClassName={navStyles.Active} 
                to='/'
            >
                    Articles
            </NavLink>
            <NavLink
                className={navStyles.NavLink} 
                activeClassName={navStyles.Active}
                to="/saved"
            >
                Reading List
            </NavLink>
            <NavLink 
                className={navStyles.NavLink} 
                activeClassName={navStyles.Active}
                to="/write"
            >
                Write
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar