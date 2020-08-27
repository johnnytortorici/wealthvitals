import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { EmergencyFundContext } from "../../context/EmergencyFundContext";

import { COLORS } from "../../../constants";
import Header from "../../header";
import Loading from "../../Loading";
import Score from "../../Score";
import Chart from "./Chart";
import ModuleForm from "./ModuleForm";

import { FiCheckCircle } from "react-icons/fi";

const EmergencyFund = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    emergencyFundScore,
    income,
    min,
    max,
    totalEmergencyFund,
  } = React.useContext(EmergencyFundContext);

  const [scoreMessage, setScoreMessage] = useState("");
  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (emergencyFundScore) {
      if (emergencyFundScore === 100) {
        setScoreMessage("Excellent!");
        setProTip(
          "You have exceeded the recommended emergency fund based on your income."
        );
      } else if (emergencyFundScore === 80) {
        setScoreMessage("Very good!");
        setProTip(
          "You have met the minimum recommended emergency fund based on your income."
        );
      } else if (emergencyFundScore === 70) {
        setScoreMessage("Good");
        setProTip(
          "You are more than half way there. Try saving a little extra every week to ensure you have at least 3 months of income in your emergency fund. Ex: $5 per day will add up to over $900 in 6 months."
        );
      } else if (emergencyFundScore < 70) {
        setScoreMessage("Needs attention");
        setProTip(
          "Building a safety net for the unexpected is one of the most important ways to protect your wealth. Try saving a little extra every week to ensure you have at least 3 months of income in your emergency fund. Ex: $5 per day will add up to over $900 in 6 months."
        );
      }
    }
  }, [emergencyFundScore]);

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
                title={"Emergency fund"}
                score={emergencyFundScore}
                scoreMessage={scoreMessage}
              />
              <Title>
                <p>Module 2</p>
                <h1>Emergency fund</h1>
              </Title>
            </PageHeading>
            {emergencyFundScore && (
              <Status>
                <FiCheckCircle color={COLORS.GREEN} /> Completed
              </Status>
            )}
            {emergencyFundScore && (
              <ProTip>
                <u>Pro tip:</u> {proTip}
              </ProTip>
            )}
            <Chart
              income={income}
              totalEmergencyFund={totalEmergencyFund}
              min={min}
              max={max}
            />
            <Content>
              <h2>What is an emergency fund?</h2>
              <Description>
                An emergency fund is money you set aside to cover unexpected
                expenses or life events (ex: losing your job). It should be
                secure and easily accessible. Savings accounts, cashable GICs
                and high-interest savings are all examples of places you can
                store your funds.
              </Description>
              <Description>
                If you don't have one set up, set yourself a Monthly savings
                goal and we'll calculate how much you will have within 6 months.
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

export default EmergencyFund;
