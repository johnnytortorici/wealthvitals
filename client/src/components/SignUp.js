import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

const SignUp = () => {
  const { authTokens, setTokens } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (ev) => {
    ev.preventDefault();
    const user = { name, email, password };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          getUser(json.user._id);
          setTokens(json.user._id);
        } else {
          alert("Something went wrong.");
        }
      });
  };

  return (
    <>
      {authTokens && <Redirect to="/dashboard" />}
      <h1>Sign up</h1>
      <form onSubmit={(ev) => handleSignUp(ev)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.currentTarget.value)}
            required
          />
        </div>
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
        <button type="submit">Sign up</button>
      </form>
      <a href="/login">Login</a>
    </>
  );
};

export default SignUp;
