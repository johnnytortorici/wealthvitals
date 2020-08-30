import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { CashFlowProvider } from "./context/CashFlowContext";
import { EmergencyFundProvider } from "./context/EmergencyFundContext";
import { DebtProvider } from "./context/DebtContext";
import { GoalsProvider } from "./context/GoalsContext";
import GlobalStyles from "./GlobalStyles";

import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./dashboard";
import CashFlow from "./modules/CashFlow";
import EmergencyFund from "./modules/EmergencyFund";
import Debt from "./modules/Debt";
import Goals from "./modules/Goals";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CashFlowProvider>
          <EmergencyFundProvider>
            <DebtProvider>
              <GoalsProvider>
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
                    <Route path="/emergencyfund">
                      <EmergencyFund />
                    </Route>
                    <Route path="/debt">
                      <Debt />
                    </Route>
                    <Route path="/goals">
                      <Goals />
                    </Route>
                  </Switch>
                </Router>
              </GoalsProvider>
            </DebtProvider>
          </EmergencyFundProvider>
          <GlobalStyles />
        </CashFlowProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
