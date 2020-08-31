import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";

import { COLORS } from "../../constants";
import Button from "../buttons/PrimaryButton";

const MobileNav = ({ mobileMenuIsClicked }) => {
  const { logOut } = React.useContext(UserContext);

  return (
    <Wrapper isClicked={mobileMenuIsClicked}>
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
      <Logout onClick={logOut}>Log out</Logout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${(prop) => (prop.isClicked ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #fff;
  font-size: 1.5em;
  background-color: ${COLORS.THEME};
  border-top: 1px solid #fff;

  @media (min-width: 851px) {
    display: none;
  }
`;

const NavItemLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  margin: 20px 0;

  &:hover {
    opacity: 0.8;
  }
  &.selected {
    border-bottom: 2px solid #fff;
  }
`;

const Logout = styled(Button)`
  font-size: 0.8em;
  border: 2px solid #fff;
`;

export default MobileNav;
