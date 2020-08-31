import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { EmergencyFundContext } from "../../context/EmergencyFundContext";

import Header from "../../header";
import Loading from "../../Loading";
import ModuleHeading from "../ModuleHeading";
import ProTip from "../ProTip";
import Chart from "./Chart";
import ModuleForm from "./ModuleForm";

const EmergencyFund = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    emergencyFundStatus,
    emergencyFundScore,
    income,
    min,
    max,
    totalEmergencyFund,
  } = React.useContext(EmergencyFundContext);

  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (emergencyFundScore) {
      if (emergencyFundScore === 100) {
        setProTip(
          <p>
            You have exceeded the recommended emergency fund based on your
            income.
          </p>
        );
      } else if (emergencyFundScore === 80) {
        setProTip(
          <p>
            You have met the minimum recommended emergency fund based on your
            income.
          </p>
        );
      } else if (emergencyFundScore === 70) {
        setProTip(
          <p>
            You are more than half way there. Try saving a little extra every
            week to ensure you have at least 3 months of income in your
            emergency fund. Ex: $5 per day will add up to over $900 in 6 months.
          </p>
        );
      } else if (emergencyFundScore < 70) {
        setProTip(
          <p>
            Building a safety net for the unexpected is one of the most
            important ways to protect your wealth. Try saving a little extra
            every week to ensure you have at least 3 months of income in your
            emergency fund. Ex: $5 per day will add up to over $900 in 6 months.
          </p>
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
          <ModuleHeading
            title={"Emergency fund"}
            moduleNum={"2"}
            score={emergencyFundScore}
          />
          <Wrapper>
            <ProTip score={emergencyFundScore} proTip={proTip} />
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
  padding: 0 60px;
`;

const Content = styled.div`
  padding: 40px 0 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default EmergencyFund;
