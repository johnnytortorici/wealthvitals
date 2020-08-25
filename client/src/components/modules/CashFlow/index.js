import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

import { COLORS, SIZE } from "../../../constants";
import Header from "../../header";
import Loading from "../../Loading";
import ModuleForm from "./ModuleForm";

import { BsSquareFill } from "react-icons/bs";

const CashFlow = () => {
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
            <PageHeading>
              <ScoreWrapper>
                <p>Cash flow score (?)</p>
                <WvScore>80%</WvScore>
                <ScoreHelper>Very good!</ScoreHelper>
              </ScoreWrapper>
              <Title>
                <p>Module 1</p>
                <h1>Cash flow</h1>
              </Title>
            </PageHeading>
            <Chart>
              <Legend>
                <LegendItem>
                  <BsSquareFill color={"#c3adf5"} />
                  <LegendLabel>Needs</LegendLabel>
                </LegendItem>
                <LegendItem>
                  <BsSquareFill color={"#9770ed"} />
                  <LegendLabel>Wants</LegendLabel>
                </LegendItem>
                <LegendItem>
                  <BsSquareFill color={COLORS.THEME} />
                  <LegendLabel>Savings</LegendLabel>
                </LegendItem>
              </Legend>
              <Guages>
                <GaugeWrapper>
                  <Outside>
                    <Inside>
                      <Needs percent={50}></Needs>
                      <Wants percent={30}></Wants>
                      <Savings percent={20}></Savings>
                    </Inside>
                  </Outside>
                  <GaugeLabel>My cash flow</GaugeLabel>
                </GaugeWrapper>
                <GaugeWrapper>
                  <Outside>
                    <Inside>
                      <Needs percent={50}></Needs>
                      <Wants percent={30}></Wants>
                      <Savings percent={20}></Savings>
                    </Inside>
                  </Outside>
                  <GaugeLabel>50/30/20 Rule</GaugeLabel>
                </GaugeWrapper>
              </Guages>
            </Chart>
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

const ScoreWrapper = styled.div`
  width: 33%;
`;

const WvScore = styled.p`
  font-size: 3em;
`;

const ScoreHelper = styled.p`
  font-size: ${SIZE.HELPER};
`;

const Title = styled.div`
  width: 33%;
  text-align: center;
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 10px 0 40px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendLabel = styled.p`
  padding-left: 10px;
`;

const Guages = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GaugeLabel = styled.p`
  padding-top: 10px;
  font-weight: 600;
`;

const Outside = styled.div`
  padding: 20px;
  height: 300px;
  width: 75px;
  background-color: #fff;
  border: 1px solid ${COLORS.PRIMARY_TEXT};
  border-radius: 10px;
`;
const Inside = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid ${COLORS.PRIMARY_TEXT};
  border-radius: 20px;
  overflow: hidden;
`;

const Needs = styled.div`
  height: ${(prop) => prop.percent}%;
  background-color: #c3adf5;
`;

const Wants = styled.div`
  height: ${(prop) => prop.percent}%;
  background-color: #9770ed;
`;

const Savings = styled.div`
  height: ${(prop) => prop.percent}%;
  background-color: ${COLORS.THEME};
`;

const Content = styled.div`
  padding: 40px 40px 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default CashFlow;
