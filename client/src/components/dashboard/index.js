import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { CashFlowContext } from "../context/CashFlowContext";
import { EmergencyFundContext } from "../context/EmergencyFundContext";
import { DebtContext } from "../context/DebtContext";

import Header from "../header";
import Loading from "../Loading";
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
  const { debtStatus, debtIsComplete, debtScore } = React.useContext(
    DebtContext
  );

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ||
      cashFlowStatus === "loading" ||
      emergencyFundStatus === "loading" ||
      debtStatus === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Wrapper>
            <PageHeading>
              <Title>My Financial Plan</Title>
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
                isCompleted={debtIsComplete}
                score={debtScore}
              />
              <Module
                num={"4"}
                name={"Goal funding"}
                icon={<GiPiggyBank />}
                path={"/goals"}
                score={false}
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

const PageHeading = styled.div``;

const Title = styled.h1`
  text-align: center;
  padding: 30px;
`;

const ModulesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Dashboard;
