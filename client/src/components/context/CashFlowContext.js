import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const CashFlowContext = React.createContext(null);

export const CashFlowProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState();
  const [score, setScore] = useState("");
  const { id, isLoggedOut, setIsLoggedOut } = useContext(UserContext);
  const { authTokens } = useContext(AuthContext);

  // INCOME
  const [income, setIncome] = useState("");

  // NEEDS
  const [housing, setHousing] = useState("");
  const [utilities, setUtilities] = useState("");
  const [groceries, setGroceries] = useState("");
  const [transport, setTransport] = useState("");
  const [healthcare, setHealthcare] = useState("");
  const [debtMinimum, setDebtMinimum] = useState("");
  const needs = {
    housing: housing,
    utilities: utilities,
    groceries: groceries,
    transport: transport,
    healthcare: healthcare,
    debtMinimum: debtMinimum,
  };
  const setNeeds = {
    setHousing: setHousing,
    setUtilities: setUtilities,
    setGroceries: setGroceries,
    setTransport: setTransport,
    setHealthcare: setHealthcare,
    setDebtMinimum: setDebtMinimum,
  };

  const handleSetNeeds = (needs) => {
    if (needs) {
      Object.values(needs).forEach((need, index) => {
        Object.values(setNeeds)[index](need);
      });
    }
  };

  // WANTS
  const [entertainment, setEntertainment] = useState("");
  const [dining, setDining] = useState("");
  const [shopping, setShopping] = useState("");
  const [gifts, setGifts] = useState("");
  const wants = {
    entertainment: entertainment,
    dining: dining,
    shopping: shopping,
    gifts: gifts,
  };
  const setWants = {
    setEntertainment: setEntertainment,
    setDining: setDining,
    setShopping: setShopping,
    setGifts: setGifts,
  };

  const handleSetWants = (wants) => {
    if (wants) {
      Object.values(wants).forEach((want, index) => {
        Object.values(setWants)[index](want);
      });
    }
  };

  // SAVINGS
  const [emergency, setEmergency] = useState("");
  const [saving, setSaving] = useState("");
  const [debtRepayment, setDebtRepayment] = useState("");
  const savings = {
    emergency: emergency,
    saving: saving,
    debtRepayment: debtRepayment,
  };
  const setSavings = {
    setEmergency: setEmergency,
    setSaving: setSaving,
    setDebtRepayment: setDebtRepayment,
  };

  const handleSetSavings = (savings) => {
    if (savings) {
      Object.values(savings).forEach((saving, index) => {
        Object.values(setSavings)[index](saving);
      });
    }
  };

  // TOTALS
  const [totalNeeds, setTotalNeeds] = useState("");
  const [totalWants, setTotalWants] = useState("");
  const [totalSavings, setTotalSavings] = useState("");
  const [reconcile, setReconcile] = useState("");

  useEffect(() => {
    setTotalNeeds(0);
    Object.values(needs).forEach((need) => {
      need === undefined && (need = 0);
      setTotalNeeds((totalNeeds) => totalNeeds + Number(need));
    });
  }, [
    housing,
    utilities,
    groceries,
    transport,
    healthcare,
    debtMinimum,
    needs,
  ]);

  useEffect(() => {
    setTotalWants(0);
    Object.values(wants).forEach((want) => {
      want === undefined && (want = 0);
      setTotalWants((totalWants) => totalWants + Number(want));
    });
  }, [entertainment, dining, shopping, gifts, wants]);

  useEffect(() => {
    setTotalSavings(0);
    Object.values(savings).forEach((saving) => {
      saving === undefined && (saving = 0);
      setTotalSavings((totalSavings) => totalSavings + Number(saving));
    });
  }, [emergency, saving, debtRepayment, savings]);

  useEffect(() => {
    setReconcile(income - totalNeeds - totalWants - totalSavings);
  }, [income, totalNeeds, totalWants, totalSavings]);

  const handleCalculate = (ev) => {
    ev.preventDefault();
    setStatus("loading");

    fetch("/cashflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        income: income,
        totalNeeds: totalNeeds,
        needs: needs,
        totalWants: totalWants,
        wants: wants,
        totalSavings: totalSavings,
        savings: savings,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          let {
            isComplete,
            score,
            income,
            needs,
            wants,
            savings,
          } = json.module;
          setIsComplete(isComplete);
          setScore(score);
          setIncome(income);
          handleSetNeeds(needs);
          handleSetWants(wants);
          handleSetSavings(savings);
          setStatus("idle");
          window.scrollTo(0, 0);
        } else {
          setError(json.message);
          console.log(json);
        }
      });
  };

  const getCashFlow = (id) => {
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
            needs,
            wants,
            savings,
          } = json.modules.cashflow;
          setIsComplete(isComplete);
          score && setScore(score);
          income && setIncome(income);
          needs && handleSetNeeds(needs);
          wants && handleSetWants(wants);
          savings && handleSetSavings(savings);
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
      setTotalNeeds("");
      setTotalWants("");
      setTotalSavings("");
      setReconcile("");

      Object.values(setNeeds).forEach((setNeed) => {
        setNeed("");
      });
      Object.values(setWants).forEach((setWant) => {
        setWant("");
      });
      Object.values(setSavings).forEach((setSaving) => {
        setSaving("");
      });
      setIsLoggedOut(false);
    }
    // eslint-disable-next-line
  }, [isLoggedOut]);

  useEffect(() => {
    if (isComplete === undefined) {
      if (authTokens) {
        const tokenId = JSON.parse(localStorage.getItem("tokens"));
        getCashFlow(tokenId);
      }
    }
    // eslint-disable-next-line
  }, [isComplete]);

  return (
    <CashFlowContext.Provider
      value={{
        cashFlowStatus: status,
        cashFlowIsComplete: isComplete,
        handleCalculate,
        cashFlowScore: score,
        income,
        setIncome,
        needs,
        setNeeds,
        wants,
        setWants,
        savings,
        setSavings,
        totalNeeds,
        totalWants,
        totalSavings,
        reconcile,
        getCashFlow,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
};
