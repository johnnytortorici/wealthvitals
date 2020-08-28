import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const DebtContext = React.createContext(null);

export const DebtProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState();
  const [score, setScore] = useState("");
  const { id, isLoggedOut, setIsLoggedOut } = useContext(UserContext);
  const { authTokens } = useContext(AuthContext);

  // INCOME
  const [income, setIncome] = useState("");

  //  DEBT PAYMENTS
  const [housing, setHousing] = useState("");
  const [loanPayments, setLoanPayments] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [otherDebt, setOtherDebt] = useState("");

  // TOTAL
  const [totalMonthlyDebt, setTotalMonthlyDebt] = useState("");

  // DEBT RATIO
  const [debtRatio, setDebtRatio] = useState("");

  useEffect(() => {
    setTotalMonthlyDebt(0);
    setTotalMonthlyDebt(
      Number(housing) +
        Number(loanPayments) +
        Number(creditCards) +
        Number(otherDebt)
    );
  }, [housing, loanPayments, creditCards, otherDebt]);

  const handleCalculate = (ev) => {
    ev.preventDefault();
    setStatus("loading");

    fetch("/debt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        income: income,
        housing: housing,
        loanPayments: loanPayments,
        creditCards: creditCards,
        otherDebt: otherDebt,
        totalMonthlyDebt: totalMonthlyDebt,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          let {
            isComplete,
            score,
            income,
            housing,
            loanPayments,
            creditCards,
            otherDebt,
            debtRatio,
          } = json.module;
          setIsComplete(isComplete);
          setScore(score);
          setIncome(income);
          setHousing(housing);
          setLoanPayments(loanPayments);
          setCreditCards(creditCards);
          setOtherDebt(otherDebt);
          setDebtRatio(debtRatio);
          setStatus("idle");
          window.scrollTo(0, 0);
        } else {
          setError(json.message);
          console.log(json);
        }
      });
  };

  const getDebt = (id) => {
    setStatus("loading");

    fetch(`/getModules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          let {
            isComplete,
            score,
            income,
            housing,
            loanPayments,
            creditCards,
            otherDebt,
            debtRatio,
          } = json.modules.debt;
          setIsComplete(isComplete);
          score && setScore(score);
          income && setIncome(income);
          housing && setHousing(housing);
          loanPayments && setLoanPayments(loanPayments);
          creditCards && setCreditCards(creditCards);
          otherDebt && setOtherDebt(otherDebt);
          debtRatio && setDebtRatio(debtRatio);
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  useEffect(() => {
    if (isLoggedOut === true) {
      setStatus("loading");
      setError("");
      setIsComplete();
      setScore("");
      setIncome("");
      setHousing("");
      setLoanPayments("");
      setCreditCards("");
      setOtherDebt("");
      setTotalMonthlyDebt("");
      setDebtRatio("");
      setIsLoggedOut(false);
    }
  }, [isLoggedOut, setIsLoggedOut]);

  useEffect(() => {
    if (isComplete === undefined) {
      if (authTokens) {
        const tokenId = JSON.parse(localStorage.getItem("tokens"));
        getDebt(tokenId);
      }
    }
  }, [isComplete, authTokens]);

  return (
    <DebtContext.Provider
      value={{
        debtStatus: status,
        debtIsComplete: isComplete,
        handleCalculate,
        debtScore: score,
        income,
        setIncome,
        housing,
        setHousing,
        loanPayments,
        setLoanPayments,
        creditCards,
        setCreditCards,
        otherDebt,
        setOtherDebt,
        totalMonthlyDebt,
        debtRatio,
        getDebt,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
};
