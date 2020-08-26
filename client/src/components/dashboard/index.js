import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { CashFlowContext } from "../context/CashFlowContext";

import { COLORS, SIZE } from "../../constants";
import Header from "../header";
import Loading from "../Loading";
import Module from "./Module";

import { GiReceiveMoney, GiUmbrella, GiPiggyBank } from "react-icons/gi";
import { BsCreditCard } from "react-icons/bs";

const Dashboard = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status, name } = React.useContext(UserContext);
  const { cashFlowStatus, isComplete, score } = React.useContext(
    CashFlowContext
  );

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
              <ScoreWrapper>
                <p>Wealthvitals score (?)</p>
                <WvScore>80%</WvScore>
                <ScoreHelper>Very good!</ScoreHelper>
              </ScoreWrapper>
              <Title>My Financial Plan (?)</Title>
            </PageHeading>
            <ModulesWrapper>
              <Module
                num={"1"}
                name={"Cash flow"}
                icon={<GiReceiveMoney />}
                path={"/cashflow"}
                isCompleted={isComplete}
                score={score}
              />
              <Module
                num={"2"}
                name={"Emergency fund"}
                icon={<GiUmbrella />}
                path={"/emergencyfund"}
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

const ScoreWrapper = styled.div`
  width: 33%;
`;

const WvScore = styled.p`
  font-size: 3em;
`;

const ScoreHelper = styled.p`
  font-size: ${SIZE.HELPER};
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
