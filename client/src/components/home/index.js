import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../Logo";
import PrimaryButton from "../buttons/PrimaryButton";

import { COLORS } from "../../constants";

const Home = () => {
  return (
    <>
      <Heading>
        <Actions>
          <LinkBtn to="/login">
            <Button>Login</Button>
          </LinkBtn>
          <LinkBtn to="/signup">
            <Button>Sign up</Button>
          </LinkBtn>
        </Actions>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </Heading>
      <Content>
        <Tagline>Level up your money</Tagline>
      </Content>
    </>
  );
};

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 50vh;
  padding: 20px;
  color: #fff;
  background-color: ${COLORS.THEME};
`;

const Actions = styled.div`
  align-self: flex-end;
`;

const LogoWrapper = styled.div`
  font-size: 1.5em;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  padding: 20px;
`;

const Tagline = styled.h2`
  font-size: 1.6em;
  font-weight: 400;
`;

const LinkBtn = styled(Link)`
  display: inline-block;
  text-decoration: none;
  margin-right: 15px;
`;

const Button = styled(PrimaryButton)`
  margin-left: 10px;
  font-size: 0.8em;
  border: 2px solid #fff;
`;

export default Home;
