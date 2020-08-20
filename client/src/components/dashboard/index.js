import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { UserContext } from "../UserContext";

const Dashboard = () => {
  const { authTokens, setTokens } = React.useContext(AuthContext);
  const { name, email } = React.useContext(UserContext);

  const logOut = () => {
    setTokens();
  };

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      <h1>Dashboard</h1>
      <p>Welcome {name}</p>
      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default Dashboard;
