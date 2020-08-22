import React from "react";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";

import { COLORS } from "../../constants";
import Logo from "../Logo";
import Button from "../buttons/PrimaryButton";

const Header = () => {
  const { status, name, logOut } = React.useContext(UserContext);

  return (
    <Wrapper>
      <Logo />
      <Admin>
        <p>Hi, {name}</p>
        <Logout onClick={logOut}>Log out</Logout>
      </Admin>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: #fff;
  background-color: ${COLORS.THEME};
`;

const Admin = styled.div`
  display: flex;
  align-items: center;
`;

const Logout = styled(Button)`
  margin-left: 20px;
  font-size: 0.8em;
  border: 2px solid #fff;
`;

export default Header;
