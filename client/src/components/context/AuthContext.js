import React, { useState } from "react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticate] = useState(false);

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
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticate, authTokens, setTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};
