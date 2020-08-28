import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { DebtContext } from "../../context/DebtContext";

import Header from "../../header";
import Loading from "../../Loading";
import ModuleHeading from "../ModuleHeading";
import ProTip from "../ProTip";
import Chart from "./Chart";
import ModuleForm from "./ModuleForm";

const Debt = () => {
  const { authTokens } = React.useContext(AuthContext);
  const { status } = React.useContext(UserContext);
  const { debtScore, income, debtRatio } = React.useContext(DebtContext);

  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (debtScore) {
      if (debtScore === 100) {
        setProTip("");
      } else if (debtScore === 80) {
        setProTip("");
      } else if (debtScore === 70) {
        setProTip("");
      } else if (debtScore < 70) {
        setProTip("");
      }
    }
  }, [debtScore]);

  return (
    <>
      {!authTokens && <Redirect to="/login" />}
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Wrapper>
            <ModuleHeading
              title={"Debt management"}
              moduleNum={"3"}
              score={debtScore}
            />
            <ProTip score={debtScore} proTip={proTip} />
            <Chart debtRatio={debtRatio} />
            <Content>
              <h2>What is a debt ratio?</h2>
              <Description>
                If you run a quick search, you'll likely find many different
                definitions and formulas to calculate your debt ratio. In short,
                a debt ratio is used to help gauge whether you have a
                sustainable amount of debt.
              </Description>
              <Description>
                It doesn't matter which formula you use, as long as it helps you
                better understand your debt situation.
              </Description>
              <ModuleForm />
            </Content>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Content = styled.div`
  padding: 40px 40px 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default Debt;
