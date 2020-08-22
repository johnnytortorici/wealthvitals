import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

import { COLORS } from "../../constants";
import Header from "../header";
import Loading from "../Loading";

const Dashboard = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status, name } = React.useContext(UserContext);

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Wrapper>
            <h1>Dashboard</h1>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

export default Dashboard;
