import React from "react";
import styled from "styled-components";

import { COLORS, SIZE, BREAK } from "../constants";

const Score = ({ title, score, scoreMessage }) => {
  return (
    <Wrapper>
      <p>{title} score (?)</p>
      <Grade>{score ? `${score}%` : <Pending>Pending</Pending>}</Grade>
      <ScoreHelper score={score}>{scoreMessage}</ScoreHelper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 33%;
  text-align: center;

  @media (max-width: ${BREAK.SMALL}) {
    width: 100%;
  }
`;

const Grade = styled.p`
  font-size: 2.5em;
`;

const Pending = styled.span`
  font-size: 0.8em;
`;

const ScoreHelper = styled.p`
  font-size: ${SIZE.HELPER};
  color: ${(prop) => (prop.score < 70 ? COLORS.ORANGE : "inherit")};
`;

export default Score;
