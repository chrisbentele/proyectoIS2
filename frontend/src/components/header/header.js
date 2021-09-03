import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header">
      {isAuthenticated ? (
        <div className="headerLinks">
          <Link to="/projects">Projects</Link>
          <LogoutButton />
        </div>
      ) : (
        <div className="headerLinks">
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default Header;
