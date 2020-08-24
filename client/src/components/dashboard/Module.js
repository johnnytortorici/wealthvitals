import React from "react";
import styled from "styled-components";

import { COLORS, SIZE, BREAK } from "../../constants";
import Button from "../buttons/SecondaryButton";

import { FiCheckCircle } from "react-icons/fi";

const description = {
  "1": "Learn how you can apply the 50/30/20 rule to ensure you stay on track.",
  "2":
    "How much do you need to set aside for a rainy day? Find out some best practices to weather any storm.",
  "3":
    "Using credit responsibly has some perks, like building your credit score or taking advantage of cash-back/rewards programs. But how much is too much?",
  "4":
    "Setting clear goals not only helps to keep track of your progress, but can also help motivate you to work smarter towards achieving them.",
};

const Module = ({ num, name, icon }) => {
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
      <ModuleFooter>
        <StartButton>Start module</StartButton>
        <StatusWrapper>
          <FiCheckCircle color={COLORS.GREEN} />
          <Status>Completed</Status>
        </StatusWrapper>
      </ModuleFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  width: calc(50% - 10px);
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 5px;
  box-shadow: 0 0 5px ${COLORS.BORDER};
  &:hover {
    box-shadow: 0 0 10px ${COLORS.BORDER};
  }

  @media (max-width: ${BREAK.MEDIUM}) {
    width: 100%;
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
  font-size: 2em;
  color: ${COLORS.THEME};
  /* color: ${(prop) => COLORS[prop.color]}; */
`;

const ScoreWrapper = styled.div`
  text-align: center;
`;

const Label = styled.p`
  font-size: ${SIZE.helper};
`;

const Score = styled.p`
  font-size: 1.8em;
  font-weight: 600;
`;

const Description = styled.p`
  padding: 20px 0;
  border-top: 1px solid ${COLORS.BORDER};
`;

const ModuleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StartButton = styled(Button)`
  font-size: ${SIZE.helper};
  font-weight: 600;
`;

const StatusWrapper = styled.div`
  display: flex;
  font-size: ${SIZE.helper};
`;

const Status = styled.p`
  padding-left: 5px;
`;

export default Module;
