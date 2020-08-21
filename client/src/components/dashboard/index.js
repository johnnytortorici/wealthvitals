import React from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

import Loading from "../Loading";

const Dashboard = () => {
  const { authTokens, setTokens } = React.useContext(AuthContext);
  const { status, name, email } = React.useContext(UserContext);

  const logOut = () => {
    setTokens();
  };

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <h1>Dashboard</h1>
          <p>Welcome {name}</p>
          <button onClick={logOut}>Log out</button>
        </>
      )}
    </>
  );
};

export default Dashboard;
