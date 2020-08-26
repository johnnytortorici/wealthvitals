const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { handleSignUp } = require("./handlers/handleSignUp");
const { handleLogin } = require("./handlers/handleLogin");
const { handleUser } = require("./handlers/handleUser");
const { handleCashFlow } = require("./handlers/handleCashFlow");
const { handleModules } = require("./handlers/handleModules");

app.listen(8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// endpoints
app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.post("/getUser", handleUser);
app.post("/cashflow", handleCashFlow);
app.post("/getModules", handleModules);
