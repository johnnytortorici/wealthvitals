const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const users = [];

app.listen(8000);
app.use(express.urlencoded({ extended: false }));

app.post("/signup", (req, res) => {});
app.post("/login", (req, res) => {});
