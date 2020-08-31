import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const GoalsContext = React.createContext(null);

export const GoalsProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [isComplete, setIsComplete] = useState();
  const [score, setScore] = useState(0);
  const { id, isLoggedOut, setIsLoggedOut } = useContext(UserContext);
  const { authTokens } = useContext(AuthContext);

  // GOALS
  const [smallGoals, setSmallGoals] = useState([]);
  const [mediumGoals, setMediumGoals] = useState([]);
  const [largeGoals, setLargeGoals] = useState([]);

  const handleAddSmall = () => {
    setSmallGoals((smallGoals) => [...smallGoals, {}]);
  };

  const handleAddMedium = () => {
    setMediumGoals((mediumGoals) => [...mediumGoals, {}]);
  };

  const handleAddLarge = () => {
    setLargeGoals((largeGoals) => [...largeGoals, {}]);
  };

  const handleSave = (
    ev,
    type,
    description,
    category,
    goalAmount,
    starting,
    monthly,
    dueDate,
    setEstimatedDate,
    setGoalStatus
  ) => {
    ev.preventDefault();
    setStatus("loading");

    fetch("/addGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        type: type,
        description: description,
        category: category,
        goalAmount: goalAmount,
        starting: starting,
        monthly: monthly,
        dueDate: dueDate,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          let { estimatedDate, goalStatus } = json.goal;
          // setIsComplete(isComplete);
          // setScore(score);
          setEstimatedDate(estimatedDate);
          setGoalStatus(goalStatus);
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  const handleDelete = (ev, index, type) => {
    ev.preventDefault();

    setStatus("loading");

    fetch("/deleteGoal", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        index: index,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          if (type === "small") {
            setSmallGoals([]);
            setSmallGoals(json.smallGoals);
          }
          if (type === "medium") {
            setMediumGoals([]);
            setMediumGoals(json.mediumGoals);
          }
          if (type === "large") {
            setLargeGoals([]);
            setLargeGoals(json.largeGoals);
          }
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  const getGoals = (id) => {
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
          let { small, medium, large } = json.modules.goals;
          // setIsComplete(isComplete);
          // score && setScore(score);
          small && setSmallGoals(small);
          medium && setMediumGoals(medium);
          large && setLargeGoals(large);
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
      setSmallGoals([]);
      setMediumGoals([]);
      setLargeGoals([]);
      setIsLoggedOut(false);
    }
  }, [isLoggedOut, setIsLoggedOut]);

  useEffect(() => {
    if (isComplete === undefined) {
      if (authTokens) {
        const tokenId = JSON.parse(localStorage.getItem("tokens"));
        getGoals(tokenId);
      }
    }
  }, [isComplete, authTokens]);

  return (
    <GoalsContext.Provider
      value={{
        goalsStatus: status,
        goalsIsComplete: isComplete,
        handleSave,
        handleDelete,
        goalsScore: score,
        smallGoals,
        setSmallGoals,
        handleAddSmall,
        mediumGoals,
        setMediumGoals,
        handleAddMedium,
        largeGoals,
        setLargeGoals,
        handleAddLarge,
        getGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
