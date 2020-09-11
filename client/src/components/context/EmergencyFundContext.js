import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const EmergencyFundContext = React.createContext(null);

export const EmergencyFundProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [isComplete, setIsComplete] = useState();
  const [score, setScore] = useState("");
  const { id, isLoggedOut, setIsLoggedOut } = useContext(UserContext);
  const { authTokens, SERVER_URI } = useContext(AuthContext);

  // INCOME
  const [income, setIncome] = useState("");

  //  EMERGENCY FUND
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");

  // TOTALS
  const [totalEmergencyFund, setTotalEmergencyFund] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    setTotalEmergencyFund(0);
    setTotalEmergencyFund(Number(currentSavings) + Number(monthlySavings * 6));
  }, [currentSavings, monthlySavings]);

  useEffect(() => {
    setMin(0);
    setMax(0);
    setMin(Number(income) * 3);
    setMax(Number(income) * 6);
  }, [income]);

  const handleCalculate = (ev) => {
    ev.preventDefault();
    setStatus("loading");

    fetch(`${SERVER_URI}/emergencyfund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        income: income,
        currentSavings: currentSavings,
        monthlySavings: monthlySavings,
        totalEmergencyFund: totalEmergencyFund,
        min: min,
        max: max,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          let {
            isComplete,
            score,
            income,
            currentSavings,
            monthlySavings,
          } = json.module;
          setIsComplete(isComplete);
          setScore(score);
          setIncome(income);
          setCurrentSavings(currentSavings);
          setMonthlySavings(monthlySavings);
          setStatus("idle");

          window.scrollTo(0, 0);
        } else {
          console.log(json);
        }
      });
  };

  const getEmergencyFund = (id) => {
    setStatus("loading");

    fetch(`${SERVER_URI}/getModules`, {
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
            currentSavings,
            monthlySavings,
          } = json.modules.emergencyfund;
          setIsComplete(isComplete);
          score && setScore(score);
          income && setIncome(income);
          currentSavings && setCurrentSavings(currentSavings);
          monthlySavings && setMonthlySavings(monthlySavings);
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  useEffect(() => {
    if (isLoggedOut === true) {
      setStatus("loading");
      setIsComplete();
      setScore("");
      setIncome("");
      setCurrentSavings("");
      setMonthlySavings("");
      setTotalEmergencyFund("");
      setMin("");
      setMax("");
      setIsLoggedOut(false);
    }
  }, [isLoggedOut, setIsLoggedOut]);

  useEffect(() => {
    if (isComplete === undefined) {
      if (authTokens) {
        const tokenId = JSON.parse(localStorage.getItem("tokens"));
        getEmergencyFund(tokenId);
      }
    }
    // eslint-disable-next-line
  }, [isComplete, authTokens]);

  return (
    <EmergencyFundContext.Provider
      value={{
        emergencyFundStatus: status,
        emergencyFundIsComplete: isComplete,
        handleCalculate,
        emergencyFundScore: score,
        income,
        setIncome,
        currentSavings,
        setCurrentSavings,
        monthlySavings,
        setMonthlySavings,
        totalEmergencyFund,
        getEmergencyFund,
        min,
        max,
      }}
    >
      {children}
    </EmergencyFundContext.Provider>
  );
};
