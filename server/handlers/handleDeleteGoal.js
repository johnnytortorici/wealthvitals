const { MongoClient, ObjectId } = require("mongodb");
const moment = require("moment");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleDeleteGoal = async (req, res) => {
  // deconstruct req.body
  const { _id, index, type } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // res.status(200).json({ index });

    const query = { _id: ObjectId(_id) };
    let newValues = {};

    if (type === "small") {
      await db
        .collection("users")
        .findOne(query)
        .then((foundUser) => {
          let smallGoals = foundUser.modules.goals.small;
          smallGoals.splice(index, 1);
          newValues = { $set: { "modules.goals.small": smallGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                smallGoals: smallGoals,
              });
              user.modifiedCount !== 1 && console.log("Module not updated.");
            }
          });
        });
    } else if (type === "medium") {
      await db
        .collection("users")
        .findOne(query)
        .then((foundUser) => {
          let mediumGoals = foundUser.modules.goals.medium;
          mediumGoals.splice(index, 1);
          newValues = { $set: { "modules.goals.medium": mediumGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                mediumGoals: mediumGoals,
              });
              user.modifiedCount !== 1 && console.log("Module not updated.");
            }
          });
        });
    } else if (type === "large") {
      await db
        .collection("users")
        .findOne(query)
        .then((foundUser) => {
          let largeGoals = foundUser.modules.goals.large;
          largeGoals.splice(index, 1);
          newValues = { $set: { "modules.goals.large": largeGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                largeGoals: largeGoals,
              });
              user.modifiedCount !== 1 && console.log("Module not updated.");
            }
          });
        });
    }
  } catch {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleDeleteGoal };
