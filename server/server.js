const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const { handleSignUp } = require("./handlers/handleSignUp");
const { handleLogin } = require("./handlers/handleLogin");
const { handleUser } = require("./handlers/handleUser");
const { handleModules } = require("./handlers/handleModules");
const { handleCashFlow } = require("./handlers/handleCashFlow");
const { handleEmergencyFund } = require("./handlers/handleEmergencyFund");
const { handleDebt } = require("./handlers/handleDebt");
const { handleAddGoal } = require("./handlers/handleAddGoal");
const { handleDeleteGoal } = require("./handlers/handleDeleteGoal");
const { handleUpdateGoal } = require("./handlers/handleUpdateGoal");

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// endpoints
app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
app.post("/getUser", handleUser);
app.post("/getModules", handleModules);
app.post("/cashflow", handleCashFlow);
app.post("/emergencyfund", handleEmergencyFund);
app.post("/debt", handleDebt);
app.post("/addGoal", handleAddGoal);
app.post("/updateGoal", handleUpdateGoal);
app.delete("/deleteGoal", handleDeleteGoal);
