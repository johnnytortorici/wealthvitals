import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { authTokens } = React.useContext(AuthContext);

  const getUser = (id) => {
    fetch(`/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          const { _id, name, email } = json.user;
          setName(name);
          setEmail(email);
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  if (name === undefined) {
    if (authTokens) {
      const tokenId = JSON.parse(localStorage.getItem("tokens"));
      getUser(tokenId);
    }
  }

  return (
    <UserContext.Provider value={{ status, name, email, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
