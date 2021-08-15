import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import "./header.css";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="header">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Header;
