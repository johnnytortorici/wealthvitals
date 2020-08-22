import React from "react";
import styled from "styled-components";

import { IoIosPulse } from "react-icons/io";

const Logo = () => {
  return (
    <Wrapper>
      <IoIosPulse />
      <p>Wealthvitals</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.5em;
`;

export default Logo;
