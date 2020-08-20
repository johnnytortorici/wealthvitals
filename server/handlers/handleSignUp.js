const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleSignUp = async (req, res) => {
  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // deconstruct req.body
    const { name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user into the users collection
    const newUser = { name, email, hashedPassword };
    await db.collection("users").insertOne(newUser, (err) => {
      if (err) console.log(err);
      else res.status(201).json({ status: 201, user: { name, email } });
      console.log("New user added.");
    });
  } catch {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleSignUp };
