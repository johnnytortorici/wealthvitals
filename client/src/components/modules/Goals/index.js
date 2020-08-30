import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { GoalsContext } from "../../context/GoalsContext";

import { COLORS, SIZE, BREAK } from "../../../constants";
import Button from "../../buttons/PrimaryButton";
import Header from "../../header";
import Loading from "../../Loading";
import ProTip from "../ProTip";
import GoalItem from "./GoalItem";

import { FaPizzaSlice } from "react-icons/fa";

const Goals = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    goalsScore,
    smallGoals,
    handleAddSmall,
    mediumGoals,
    handleAddMedium,
    largeGoals,
    handleAddLarge,
  } = React.useContext(GoalsContext);

  const [proTip, setProTip] = useState("");

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <ModuleHeading>
            <p>Module 4</p>
            <h1>Goal funding</h1>
          </ModuleHeading>
          <Wrapper>
            <Content>
              <h2>What are SMART goals?</h2>
              <Description>
                SMART is an acronym for <strong>Specific</strong>,{" "}
                <strong>Measurable</strong>, <strong>Achievable</strong>,{" "}
                <strong>Relevant</strong> and <strong>Time-bound</strong> goals.
                Setting clear goals not only helps to keep track of your
                progress, but can also help motivate you to work smarter towards
                achieving them.
              </Description>
            </Content>
            <SectionHeading>
              <NameIcon>
                <Icon>
                  <FaPizzaSlice />
                </Icon>
                <div>
                  <h2>Small Goals</h2>
                  <p>0 - $2,000</p>
                </div>
              </NameIcon>
              <Button onClick={handleAddSmall}>Add small goal</Button>
            </SectionHeading>
            <GoalsWrapper>
              {smallGoals.map((goal, index) => {
                return (
                  <GoalItem
                    goal={goal}
                    type="small"
                    index={index}
                    key={`goal-${index}`}
                  />
                );
              })}
            </GoalsWrapper>
          </Wrapper>
          <Wrapper>
            <SectionHeading>
              <NameIcon>
                <Icon>
                  <FaPizzaSlice />
                  <FaPizzaSlice />
                </Icon>
                <div>
                  <h2>Medium Goals</h2>
                  <p>$2,001 - $10,000</p>
                </div>
              </NameIcon>
              <Button onClick={handleAddMedium}>Add medium goal</Button>
            </SectionHeading>
            <GoalsWrapper>
              {mediumGoals.map((goal, index) => {
                return (
                  <GoalItem
                    goal={goal}
                    type="medium"
                    index={index}
                    key={`goal-${index}`}
                  />
                );
              })}
            </GoalsWrapper>
          </Wrapper>
          <Wrapper>
            <SectionHeading>
              <NameIcon>
                <Icon>
                  <FaPizzaSlice />
                  <FaPizzaSlice />
                  <FaPizzaSlice />
                </Icon>
                <div>
                  <h2>Large Goals</h2>
                  <p>{">"} $10,000</p>
                </div>
              </NameIcon>
              <Button onClick={handleAddLarge}>Add large goal</Button>
            </SectionHeading>
            <GoalsWrapper>
              {largeGoals.map((goal, index) => {
                return (
                  <GoalItem
                    goal={goal}
                    type="large"
                    index={index}
                    key={`goal-${index}`}
                  />
                );
              })}
            </GoalsWrapper>
          </Wrapper>
          {/* <Content>
              <h2>What is a debt ratio?</h2>
              <Description>
                If you run a quick search, you'll likely find many different
                definitions and formulas to calculate your debt ratio. In short,
                a debt ratio is used to help gauge whether you have a
                sustainable amount of debt.
              </Description>
              <Description>
                It doesn't matter which formula you use, as long as it helps you
                better understand your debt situation.
              </Description>
              <ModuleForm />
            </Content> */}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;
`;

const ModuleHeading = styled.div`
  text-align: center;
  padding: 30px;
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.BORDER};
`;

const GoalsWrapper = styled.div``;

const NameIcon = styled.div`
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  font-size: 2em;
  color: ${COLORS.THEME};
`;

const ColHeadings = styled.ul`
  display: flex;
  list-style-type: none;
  border-bottom: 1px solid ${COLORS.BORDER};
`;

const Heading = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 20%;
  padding-bottom: 10px;
`;

const Status = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 10%;
  padding-bottom: 10px;
`;

const Content = styled.div`
  padding-bottom: 60px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default Goals;
