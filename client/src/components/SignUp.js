import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

import { COLORS } from "../constants";
import Logo from "./Logo";
import SignUpButton from "./buttons/PrimaryButton";

const SignUp = () => {
  const { authTokens, setTokens } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <Wrapper>
      {authTokens && <Redirect to="/dashboard" />}
      <Logo />
      <SignUpWrapper>
        <Heading>Sign up</Heading>
        <Error>{error}</Error>
        <Form onSubmit={(ev) => handleSignUp(ev)}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.currentTarget.value)}
            required
          />
          <InputLabel htmlFor="email">Email</InputLabel>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.currentTarget.value)}
            required
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(ev) => setPassword(ev.currentTarget.value)}
            required
          />
          <SignUpButton type="submit">Sign up</SignUpButton>
        </Form>
        <Helper>
          Already have an account? <Link to="/login">Login</Link>
        </Helper>
      </SignUpWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  margin-top: 40px;
  padding: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 5px;
  box-shadow: 0 0 5px ${COLORS.BORDER};
`;

const Heading = styled.h1`
  text-align: center;
`;

const Error = styled.p`
  padding-top: 10px;
  font-size: 0.8em;
  text-align: center;
  color: ${COLORS.RED};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  padding: 10px 0 5px;
`;

const Helper = styled.p`
  font-size: 0.8em;
  text-align: center;
`;

export default SignUp;
