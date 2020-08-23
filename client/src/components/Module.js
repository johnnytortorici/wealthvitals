import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";

const description = {
  "1": "Learn how you can apply the 50/30/20 rule to ensure you stay on track.",
  "2":
    "How much do you need to set aside for a rainy day? Find out some best practices to weather any storm.",
  "3":
    "Using credit responsibly has some perks, like building your credit score or taking advantage of cash-back/rewards programs. But how much is too much?",
  "4":
    "Setting clear goals not only helps to keep track of your progress, but can also help motivate you to work smarter towards achieving them.",
};

const Module = ({ num, name, icon, color }) => {
  return (
    <Wrapper>
      <Heading>
        <NameIcon>
          <Icon>{icon}</Icon>
          <div>
            <p>Module {num}</p>
            <ModuleName>
              <h2>{name}</h2>
            </ModuleName>
          </div>
        </NameIcon>
        <ScoreWrapper>
          <Label>Module Score</Label>
          <Score>80%</Score>
        </ScoreWrapper>
      </Heading>
      <Description>{description[num]}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 20px 0 0;
  padding: 20px;
  width: calc(50% - 20px);
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 5px;
  box-shadow: 0 0 5px ${COLORS.BORDER};
  &:hover {
    box-shadow: 0 0 10px ${COLORS.BORDER};
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const NameIcon = styled.div`
  display: flex;
`;

const ModuleName = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  font-size: 1.7em;
`;

const ScoreWrapper = styled.div`
  text-align: center;
`;

const Label = styled.p`
  font-size: 0.8em;
`;

const Score = styled.p`
  font-size: 1.5em;
  font-weight: 600;
`;

const Description = styled.p`
  padding: 20px 0;
  font-size: 0.9em;
  border-top: 1px solid ${COLORS.BORDER};
`;

export default Module;
