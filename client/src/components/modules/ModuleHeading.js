import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { BREAK } from "../../constants";

import Score from "../Score";

const ModuleHeading = ({ title, moduleNum, score }) => {
  const [scoreMessage, setScoreMessage] = useState("");

  useEffect(() => {
    if (score) {
      if (score === 100) {
        setScoreMessage("Excellent!");
      } else if (score === 90) {
        setScoreMessage("Very good!");
      } else if (score === 80) {
        setScoreMessage("Good");
      } else if (score === 70) {
        setScoreMessage("Good start");
      } else if (score < 70) {
        setScoreMessage("Needs attention");
      }
    }
  }, [score]);

  return (
    <Wrapper>
      <Score title={title} score={score} scoreMessage={scoreMessage} />
      <Title>
        <p>Module {moduleNum}</p>
        <h1>{title}</h1>
      </Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  @media (max-width: ${BREAK.SMALL}) {
    flex-direction: column-reverse;
    padding-bottom: 40px;
  }
`;

const Title = styled.div`
  width: 33%;
  text-align: center;

  @media (max-width: ${BREAK.SMALL}) {
    width: 100%;
    padding-bottom: 40px;
  }
`;

export default ModuleHeading;
