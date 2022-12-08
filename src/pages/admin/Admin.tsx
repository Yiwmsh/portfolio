import React from "react";
import { Login } from "./Login";

const storedUsername = sessionStorage.getItem("username");
const storedPassword = sessionStorage.getItem("password");

export const Admin: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = (username: string, password: string) => {
    if (
      username === process.env.REACT_APP_adminUsername &&
      password === process.env.REACT_APP_adminPassword
    ) {
      setLoggedIn(true);

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);

      return true;
    } else {
      setLoggedIn(false);
      return false;
    }
  };

  if (storedUsername && storedPassword) {
    handleLogin(storedUsername, storedPassword);
    if (!loggedIn) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("password");
    }
  }

  return loggedIn ? (
    <>
      <p>Placeholder</p>
    </>
  ) : (
    <>
      <Login loginHandler={handleLogin} />
    </>
  );
};
