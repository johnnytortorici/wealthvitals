import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../components/UserContext";

const SignUp = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    isLoggedIn,
    setIsLoggedIn,
  } = React.useContext(UserContext);
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
          setIsLoggedIn(true);
        } else {
          alert("Something went wrong.");
        }
      });
  };

  return (
    <>
      {isLoggedIn && <Redirect to="/dashboard" />}
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
