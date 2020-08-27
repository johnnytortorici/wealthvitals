import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { CashFlowContext } from "../../context/CashFlowContext";

import { COLORS } from "../../../constants";
import Header from "../../header";
import Loading from "../../Loading";
import Score from "../../Score";
import Chart from "./Chart";
import ModuleForm from "./ModuleForm";

import { FiCheckCircle } from "react-icons/fi";

const CashFlow = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    cashFlowScore,
    income,
    totalNeeds,
    totalWants,
    totalSavings,
  } = React.useContext(CashFlowContext);

  const [scoreMessage, setScoreMessage] = useState("");
  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (cashFlowScore) {
      if (cashFlowScore === 100) {
        setScoreMessage("Excellent!");
        setProTip("Excellent!");
      } else if (cashFlowScore === 90) {
        setScoreMessage("Very good!");
        setProTip("Very good!");
      } else if (cashFlowScore === 80) {
        setScoreMessage("Good");
        setProTip("Good");
      } else if (cashFlowScore === 70) {
        setScoreMessage("Good start");
        setProTip("Good start");
      } else if (cashFlowScore < 70) {
        setScoreMessage("Needs attention");
        setProTip("Needs attention");
      }
    }
  }, [cashFlowScore]);

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
                title={"Cash flow"}
                score={cashFlowScore}
                scoreMessage={scoreMessage}
              />
              <Title>
                <p>Module 1</p>
                <h1>Cash flow</h1>
              </Title>
            </PageHeading>
            {cashFlowScore && (
              <Status>
                <FiCheckCircle color={COLORS.GREEN} /> Completed
              </Status>
            )}
            {cashFlowScore && (
              <ProTip>
                <u>Pro tip:</u> {proTip}
              </ProTip>
            )}
            <Chart
              income={income}
              totalNeeds={totalNeeds}
              totalWants={totalWants}
              totalSavings={totalSavings}
            />
            <Content>
              <h2>What is the 50/30/20 rule?</h2>
              <Description>
                The 50/30/20 rule is a budgeting technique that helps to
                simplify your monthly cash flow into 3 categories: Needs, Wants,
                and Savings. As your situation will likely look different, the
                rule is a flexible guideline that can be adapted to your needs.
              </Description>
              <Description>
                See how your budget compares and where you can potentially
                improve.
              </Description>
              <ModuleForm />
            </Content>
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

const Title = styled.div`
  width: 33%;
  text-align: center;
`;

const Status = styled.p`
  font-size: 1.5em;
  text-align: center;
  padding-top: 20px;
`;

const ProTip = styled.p`
  margin: 30px 50px 0;
  padding: 10px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
  background-color: #fff;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 40px 40px 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default CashFlow;
