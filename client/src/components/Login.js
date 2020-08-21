import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

const Login = () => {
  const { authTokens, setTokens } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (ev) => {
    ev.preventDefault();
    const user = { email, password };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          getUser(json.user._id);
          setTokens(json.user._id);
        } else {
          setError(json.message);
          console.log(json);
        }
      });
  };

  return (
    <>
      {authTokens && <Redirect to="/dashboard" />}
      <h1>Login</h1>
      <p>{error}</p>
      <form onSubmit={(ev) => handleLogin(ev)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(ev) => setPassword(ev.currentTarget.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Sign up</a>
    </>
  );
};

export default Login;
