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
  const { debtStatus, debtScore, income, debtRatio } = React.useContext(
    DebtContext
  );

  const [proTip, setProTip] = useState("");

  useEffect(() => {
    if (debtScore) {
      if (debtScore === 100) {
        setProTip(<p>Your debt situation is on track. Keep it up!</p>);
      } else if (debtScore === 80) {
        setProTip(
          <p>
            Your debt situation is manageable. Wherever possible, discuss with
            your bank the possibility of consolidating debts to lower your
            overall interest payments. If you are looking for strategies to pay
            off debt, learn how the{" "}
            <a
              href="https://www.daveramsey.com/blog/how-the-debt-snowball-method-works"
              target="_blank"
            >
              Snowball Method
            </a>{" "}
            can help.
          </p>
        );
      } else if (debtScore === 60) {
        setProTip(
          <p>
            Your debt situation needs attention. Wherever possible, discuss with
            your bank the possibility of consolidating debts to lower your
            overall interest payments. If you are looking for strategies to pay
            off debt, learn how the{" "}
            <a
              href="https://www.daveramsey.com/blog/how-the-debt-snowball-method-works"
              target="_blank"
            >
              Snowball Method
            </a>{" "}
            can help.
          </p>
        );
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
          <ModuleHeading
            title={"Debt management"}
            moduleNum={"3"}
            score={debtScore}
          />
          <Wrapper>
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
  padding: 0 60px;
`;

const Content = styled.div`
  padding: 40px 0 20px;
`;

const Description = styled.p`
  padding-top: 20px;
`;

export default Debt;
