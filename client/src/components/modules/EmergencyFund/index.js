import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { EmergencyFundContext } from "../../context/EmergencyFundContext";

import { COLORS, SIZE } from "../../../constants";
import Header from "../../header";
import Loading from "../../Loading";
import Score from "../../Score";
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
            <Chart>
              <GaugeWrapper>
                <Outside>
                  <Inside>
                    <Funds
                      percent={
                        income !== ""
                          ? `${(totalEmergencyFund / max) * 100}`
                          : 50
                      }
                    >
                      <FundsAmount
                        percent={
                          income !== "" && `${(totalEmergencyFund / max) * 100}`
                        }
                      >
                        {income !== "" &&
                          `$${totalEmergencyFund.toLocaleString("en-CA")}`}
                      </FundsAmount>
                    </Funds>
                  </Inside>
                  <ChartLabel>
                    <LabelThree>
                      <BarLabel>
                        <p>|</p>
                        <p>3 Months</p>
                        <p>{income && `$${min.toLocaleString("en-CA")}`}</p>
                        <p>Min. recommended</p>
                      </BarLabel>
                    </LabelThree>
                    <LabelSix>
                      <BarLabel>
                        <p>|</p>
                        <p>6 Mo.</p>
                        <p>{income && `$${max.toLocaleString("en-CA")}`}</p>
                      </BarLabel>
                    </LabelSix>
                  </ChartLabel>
                </Outside>
                <GaugeLabel>My emergency fund</GaugeLabel>
              </GaugeWrapper>
            </Chart>
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

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const ChartLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${SIZE.HELPER};
`;

const LabelThree = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`;

const LabelSix = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 33%;
`;

const BarLabel = styled.div`
  text-align: center;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

const GaugeLabel = styled.p`
  padding-top: 10px;
  font-weight: 600;
`;

const Outside = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
`;
const Inside = styled.div`
  padding: 10px 18px;
  height: 150px;
  border: 1px solid ${COLORS.PRIMARY_TEXT};
  overflow: hidden;
  color: #fff;
  font-weight: 600;
`;

const Funds = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${(prop) => prop.percent}%;
  background-color: ${COLORS.THEME};
`;

const FundsAmount = styled.p`
  transform: ${(prop) => (prop.percent < 20 ? "rotate(-90deg)" : "")};
`;

const Content = styled.div`
  padding: 40px 40px 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default EmergencyFund;
