import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import image from './DevRabbit-logo.png'
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser}>

        </ProfileButton>
      )
    } else {
      sessionLinks = (
        <div className="navBar">
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      );
    }

  return (
    <ul className="navBar">
      <li>
        <NavLink exact to="/">
          <div className="Logo-container">
            <img
              className="logo"
              src={image}
              alt="DevRabbit Logo"
            ></img>
          </div>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
