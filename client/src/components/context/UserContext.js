import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { authTokens, setTokens } = React.useContext(AuthContext);

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
          setId(_id);
          setName(name);
          setEmail(email);
          setStatus("idle");
        } else {
          console.log(json);
        }
      });
  };

  const logOut = () => {
    setStatus("loading");
    setName();
    setEmail();
    setTokens();
  };

  if (name === undefined) {
    if (authTokens) {
      const tokenId = JSON.parse(localStorage.getItem("tokens"));
      getUser(tokenId);
    }
  }

  return (
    <UserContext.Provider value={{ status, id, name, email, getUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
