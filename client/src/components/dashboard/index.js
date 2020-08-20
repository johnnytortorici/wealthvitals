import React from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";

const Dashboard = () => {
  const { name, email, isLoggedIn } = React.useContext(UserContext);

  return (
    <>
      {!isLoggedIn && <Redirect to="/login" />}
      <h1>Dashboard</h1>
      <p>Welcome {name}</p>
    </>
  );
};

export default Dashboard;
