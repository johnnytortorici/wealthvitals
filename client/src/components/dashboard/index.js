import React from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

import { COLORS } from "../../constants";
import Button from "../buttons/PrimaryButton";
import Loading from "../Loading";

const Dashboard = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status, name, email, logOut } = React.useContext(UserContext);

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <h1>Dashboard</h1>
          <p>Welcome {name}</p>
          <Button onClick={logOut}>Log out</Button>
        </>
      )}
    </>
  );
};

export default Dashboard;
