import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";

import { COLORS, BREAK } from "../../constants";
import MobileNav from "./MobileNav";
import Logo from "../Logo";
import Button from "../buttons/PrimaryButton";

import { BiDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const { name, logOut } = React.useContext(UserContext);
  const [isOverDropDown, setIsOverDropDown] = useState(false);
  const [mobileMenuIsClicked, setMobileMenuIsClicked] = useState(false);

  return (
    <>
      <Wrapper>
        <LogoNav>
          <Logo />
          <Nav>
            <NavItemLink to="/dashboard" activeClassName="selected">
              Dashboard
            </NavItemLink>
            <DropDownWrapper
              onMouseEnter={() => setIsOverDropDown(true)}
              onMouseLeave={() => setIsOverDropDown(false)}
            >
              <DropHeading>
                Modules <Icon size={15} />
              </DropHeading>
              <ModulesDropDown isOverDropDown={isOverDropDown}>
                <ModuleItem>
                  <NavItemLink to="/cashflow" activeClassName="selected">
                    Cash flow
                  </NavItemLink>
                </ModuleItem>
                <ModuleItem>
                  <NavItemLink to="/emergencyfund" activeClassName="selected">
                    Emergency fund
                  </NavItemLink>
                </ModuleItem>
                <ModuleItem>
                  <NavItemLink to="/debt" activeClassName="selected">
                    Debt
                  </NavItemLink>
                </ModuleItem>
                <ModuleItem>
                  <NavItemLink to="/goals" activeClassName="selected">
                    Goals
                  </NavItemLink>
                </ModuleItem>
              </ModulesDropDown>
            </DropDownWrapper>
          </Nav>
        </LogoNav>
        <Admin>
          <p>Hi, {name}</p>
          <Logout onClick={logOut}>Log out</Logout>
        </Admin>
        <MobileMenu
          onClick={() =>
            !mobileMenuIsClicked
              ? setMobileMenuIsClicked(true)
              : setMobileMenuIsClicked(false)
          }
        >
          {!mobileMenuIsClicked ? (
            <GiHamburgerMenu size={16} />
          ) : (
            <MdClose size={16} />
          )}
        </MobileMenu>
      </Wrapper>
      <MobileNav mobileMenuIsClicked={mobileMenuIsClicked} />
    </>
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
  display: flex;
  padding-left: 50px;

  @media (max-width: ${BREAK.MEDIUM}) {
    display: none;
  }
`;

const NavItemLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
  &.selected {
    border-bottom: 2px solid #fff;
  }
`;

const DropDownWrapper = styled.div`
  width: 175px;
  margin-left: 30px;
  cursor: default;
`;

const DropHeading = styled.p`
  display: flex;
  align-items: center;
  padding: 0 20px 2px;
`;

const Icon = styled(BiDownArrow)`
  margin-left: 5px;
`;

const ModulesDropDown = styled.ul`
  display: ${(prop) => (prop.isOverDropDown ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  padding: 0 20px 20px;
  background-color: ${COLORS.THEME};
`;

const ModuleItem = styled.li`
  padding-top: 20px;
  list-style-type: none;
`;

const Admin = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${BREAK.MEDIUM}) {
    display: none;
  }
`;

const Logout = styled(Button)`
  margin-left: 20px;
  font-size: 0.8em;
  border: 2px solid #fff;
`;

const MobileMenu = styled(Button)`
  display: none;
  border: 2px solid #fff;

  @media (max-width: ${BREAK.MEDIUM}) {
    display: inherit;
  }
`;

export default Header;
