import React from "react";

const SignUp = () => {
  return (
    <>
      <h1>Sign up</h1>
      <form action="/signup" method="POST">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <a href="/login">Login</a>
    </>
  );
};

export default SignUp;
