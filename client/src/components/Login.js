import React from "react";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form action="/login" method="POST">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Sign up</a>
    </>
  );
};

export default Login;
