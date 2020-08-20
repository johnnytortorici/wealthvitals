import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../components/UserContext";

const Login = () => {
  const { email, setEmail, isLoggedIn, setIsLoggedIn } = React.useContext(
    UserContext
  );
  const [password, setPassword] = useState("");

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
          setIsLoggedIn(true);
        } else {
          console.log(json);
        }
      });
  };

  return (
    <>
      {isLoggedIn && <Redirect to="/dashboard" />}
      <h1>Login</h1>
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
