import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import { FiCheckCircle } from "react-icons/fi";

const ProTip = ({ score, proTip }) => {
  return (
    <>
      {score && (
        <Status>
          <FiCheckCircle color={COLORS.GREEN} /> Completed
        </Status>
      )}
      {score && (
        <Tip>
          <Heading>Pro tip:</Heading>
          {proTip}
        </Tip>
      )}
    </>
  );
};

const Status = styled.p`
  font-size: 1.5em;
  text-align: center;
`;

const Heading = styled.p`
  font-size: 1.1em;
  text-decoration: underline;
  padding-bottom: 10px;
`;

const Tip = styled.p`
  margin: 30px 0;
  padding: 10px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
  background-color: #fff;
  font-weight: 600;
`;

export default ProTip;
