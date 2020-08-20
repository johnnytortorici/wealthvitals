const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleLogin = async (req, res) => {
  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // deconstruct req.body
    const { email, password } = req.body;

    // find user in users collection
    await db
      .collection("users")
      .findOne({ email: email }, async (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            const { _id, name, email, hashedPassword } = foundUser;
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
              res.status(200).json({
                status: 200,
                user: { _id, name, email },
                message: "Successful login",
              });
              console.log("Successful login");
            } else {
              res
                .status(400)
                .json({ status: 400, message: "Your password is incorrect." });
            }
          } else {
            res
              .status(404)
              .json({ status: 404, message: "No user found with that email." });
          }
        }
      });
  } catch {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleLogin };
