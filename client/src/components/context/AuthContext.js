import React, { useState } from "react";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;
export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    } else {
      localStorage.clear();
      setAuthTokens();
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens, SERVER_URI }}>
      {children}
    </AuthContext.Provider>
  );
};
