import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { GoalsContext } from "../../context/GoalsContext";

import { BREAK } from "../../../constants";
import { COLORS } from "../../../constants";
import Button from "../../buttons/PrimaryButton";
import Header from "../../header";
import Loading from "../../Loading";
import GoalItem from "./GoalItem";

import { FaPizzaSlice } from "react-icons/fa";

const Goals = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const {
    smallGoals,
    handleAddSmall,
    mediumGoals,
    handleAddMedium,
    largeGoals,
    handleAddLarge,
  } = React.useContext(GoalsContext);

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
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;

  @media (max-width: ${BREAK.SMALL}) {
    padding: 20px 20px;
  }
`;

const ModuleHeading = styled.div`
  text-align: center;
  padding: 30px;
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.BORDER};

  @media (max-width: ${BREAK.SMALL}) {
    flex-direction: column;
  }
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

const Content = styled.div`
  padding-bottom: 60px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default Goals;
