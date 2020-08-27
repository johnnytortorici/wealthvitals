import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { CashFlowContext } from "../context/CashFlowContext";
import { EmergencyFundContext } from "../context/EmergencyFundContext";

import { SIZE } from "../../constants";
import Header from "../header";
import Loading from "../Loading";
import Score from "../Score";
import Module from "./Module";

import { GiReceiveMoney, GiUmbrella, GiPiggyBank } from "react-icons/gi";
import { BsCreditCard } from "react-icons/bs";

const Dashboard = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    cashFlowStatus,
    cashFlowIsComplete,
    cashFlowScore,
  } = React.useContext(CashFlowContext);
  const {
    emergencyFundStatus,
    emergencyFundIsComplete,
    emergencyFundScore,
  } = React.useContext(EmergencyFundContext);

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Wrapper>
            <PageHeading>
              <Score
                title={"Wealthvitals"}
                score={80}
                scoreMessage={"Very good!"}
              />
              <Title>My Financial Plan (?)</Title>
            </PageHeading>
            <ModulesWrapper>
              <Module
                num={"1"}
                name={"Cash flow"}
                icon={<GiReceiveMoney />}
                path={"/cashflow"}
                isCompleted={cashFlowIsComplete}
                score={cashFlowScore}
              />
              <Module
                num={"2"}
                name={"Emergency fund"}
                icon={<GiUmbrella />}
                path={"/emergencyfund"}
                isCompleted={emergencyFundIsComplete}
                score={emergencyFundScore}
              />
              <Module
                num={"3"}
                name={"Debt management"}
                icon={<BsCreditCard />}
                path={"/debt"}
              />
              <Module
                num={"4"}
                name={"Goal funding"}
                icon={<GiPiggyBank />}
                path={"/goals"}
              />
            </ModulesWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const PageHeading = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  width: 33%;
  text-align: center;
`;

const ModulesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Dashboard;
