import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
`;

const Title = styled.div`
  width: 33%;
  text-align: center;
`;

export default ModuleHeading;
