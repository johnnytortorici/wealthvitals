import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
