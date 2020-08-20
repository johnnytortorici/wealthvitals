const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { handleSignUp } = require("./handlers/handleSignUp");
const { handleLogin } = require("./handlers/handleLogin");

app.listen(8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// endpoints
app.post("/signup", handleSignUp);
app.post("/login", handleLogin);
