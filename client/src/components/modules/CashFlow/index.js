import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
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
    cashFlowStatus,
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
        setProTip(
          <p>
            You have met or exceeded the recommended savings rate. Keep it up!
          </p>
        );
      } else if (cashFlowScore === 90) {
        setProTip(
          <p>
            You are saving a good portion of your income already. Consider
            saving any unexpected income such as bonuses or any tax refunds to
            give you that extra savings boost.
          </p>
        );
      } else if (cashFlowScore < 80) {
        setProTip(
          <p>
            When it comes to saving, something is always better than nothing.
            One technique that can help you prioritize saving is to{" "}
            <a
              href="https://www.investopedia.com/ask/answers/12/pay-yourself.asp"
              target="_blank"
            >
              Pay Yourself First
            </a>
            . If it seems impossible to save anything at all, it might be time
            to look over your expenses for savings opportunities or downsizing
            in some areas.
          </p>
        );
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
