import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";

import { COLORS } from "../../constants";
import Logo from "../Logo";
import Button from "../buttons/PrimaryButton";

const Header = () => {
  const { status, name, logOut } = React.useContext(UserContext);

  return (
    <Wrapper>
      <LogoNav>
        <Logo />
        <Nav>
          <NavItemLink to="/dashboard" activeClassName="selected">
            Dashboard
          </NavItemLink>
          <NavItemLink to="/cashflow" activeClassName="selected">
            Cash flow
          </NavItemLink>
          <NavItemLink to="/emergencyfund" activeClassName="selected">
            Emergency fund
          </NavItemLink>
          <NavItemLink to="/debt" activeClassName="selected">
            Debt
          </NavItemLink>
          <NavItemLink to="/goals" activeClassName="selected">
            Goals
          </NavItemLink>
        </Nav>
      </LogoNav>
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

const LogoNav = styled.nav`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  padding-left: 50px;
`;

const NavItemLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  margin-right: 30px;
  &:hover {
    opacity: 0.8;
  }
  &.selected {
    border-bottom: 2px solid #fff;
  }
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
