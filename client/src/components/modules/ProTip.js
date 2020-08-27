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
          <u>Pro tip:</u> {proTip}
        </Tip>
      )}
    </>
  );
};

const Status = styled.p`
  font-size: 1.5em;
  text-align: center;
  padding-top: 20px;
`;

const Tip = styled.p`
  margin: 30px 50px 0;
  padding: 10px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
  background-color: #fff;
  font-weight: 600;
`;

export default ProTip;
