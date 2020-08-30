import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { CashFlowContext } from "../../context/CashFlowContext";

import Header from "../../header";
import Loading from "../../Loading";
import ModuleHeading from "../ModuleHeading";
import ProTip from "../ProTip";
import Chart from "./Chart";
import ModuleForm from "./ModuleForm";

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

  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (cashFlowScore) {
      if (cashFlowScore === 100) {
        setProTip("Excellent!");
      } else if (cashFlowScore === 90) {
        setProTip("Very good!");
      } else if (cashFlowScore === 80) {
        setProTip("Good");
      } else if (cashFlowScore === 70) {
        setProTip("Good start");
      } else if (cashFlowScore < 70) {
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
          <ModuleHeading
            title={"Cash flow"}
            moduleNum={"1"}
            score={cashFlowScore}
          />
          <Wrapper>
            <ProTip score={cashFlowScore} proTip={proTip} />
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
  padding: 0 60px;
`;

const Content = styled.div`
  padding: 40px 0 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default CashFlow;
