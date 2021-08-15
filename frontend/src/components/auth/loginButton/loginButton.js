import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./loginButton.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="loginButton"
      onClick={() =>
        loginWithRedirect({ redirectUri: "http://localhost:3000/profile" })
      }
    >
      Login
    </button>
  );
};

export default LoginButton;
