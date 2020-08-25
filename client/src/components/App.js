import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import GlobalStyles from "./GlobalStyles";

import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./dashboard";
import CashFlow from "./modules/CashFlow";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/cashflow">
              <CashFlow />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
