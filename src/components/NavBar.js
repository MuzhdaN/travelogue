import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from "../assets/logo.png"
import navStyles from  "../styles/NavBar.module.css"
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import clickOutsideToggle from '../hooks/useClickOutisdeToggle';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = clickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addBlogPost = (
    <NavLink 
    className={navStyles.NavLink} 
    activeClassName={navStyles.Active}
    to="/write"
    >
        Write
    </NavLink>
  ) 
  const loggedInIcons = (
    <>
      <NavLink 
        exact 
        className={navStyles.NavLink} 
        ctiveClassName={navStyles.Active} 
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
        to="/" onClick={handleSignOut}
      >
        Sign out
      </NavLink>
      <NavLink
        className={navStyles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
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
    <Navbar expanded={expanded} className={navStyles.NavBar} expand="md" fixed='top'>
      <Container>
        <Navbar.Brand>
            <img src={logo} alt="logo" height="50" className="me-2" />
            <span className="mt-1">Travelogue</span>
        </Navbar.Brand>
        <Navbar.Toggle 
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
         />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">

            {currentUser && addBlogPost}
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar