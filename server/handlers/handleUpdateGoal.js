const { MongoClient, ObjectId } = require("mongodb");
const moment = require("moment");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleUpdateGoal = async (req, res) => {
  // deconstruct req.body
  const {
    _id,
    type,
    description,
    category,
    goalAmount,
    starting,
    monthly,
    dueDate,
  } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // calculate estimated date
    const monthsLeft = Math.ceil((goalAmount - starting) / monthly);
    const estimatedDate = moment()
      .add(monthsLeft, "months")
      .format("YYYY-MM-DD");

    // calculate goal status
    const targetDate = moment(dueDate).format("YYYY-MM-DD");
    const isBefore = moment(estimatedDate).isSameOrBefore(targetDate);
    let goalStatus = "";
    let duration = 0;

    if (!isBefore) {
      const x = new moment(targetDate);
      const y = new moment(estimatedDate);
      duration = moment.duration(y.diff(x)).as("days");
    }

    if (duration > 30) goalStatus = "Needs attention";
    else if (duration > 0) goalStatus = "Very close";
    else goalStatus = "On track";

    const query = { _id: ObjectId(_id) };
    let newValues = {};

    const updatedGoal = {
      description,
      category,
      goalAmount,
      starting,
      monthly,
      dueDate,
      estimatedDate,
      goalStatus,
    };

    if (type === "small") {
      await db
        .collection("users")
        .findOne(query)
        .then((foundUser) => {
          let smallGoals = foundUser.modules.goals.small;
          smallGoals.find((goal, index) => {
            if (goal.description === description) {
              smallGoals.splice(index, 1, updatedGoal);
            }
          });
          newValues = { $set: { "modules.goals.small": smallGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                goal: { estimatedDate, targetDate, goalStatus, duration },
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
          mediumGoals.find((goal, index) => {
            if (goal.description === description) {
              mediumGoals.splice(index, 1, updatedGoal);
            }
          });
          newValues = { $set: { "modules.goals.medium": mediumGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                goal: { estimatedDate, targetDate, goalStatus, duration },
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
          largeGoals.find((goal, index) => {
            if (goal.description === description) {
              largeGoals.splice(index, 1, updatedGoal);
            }
          });
          newValues = { $set: { "modules.goals.large": largeGoals } };

          db.collection("users").updateOne(query, newValues, (err, user) => {
            if (err) console.log(err);
            else {
              res.status(200).json({
                status: 200,
                goal: { estimatedDate, targetDate, goalStatus, duration },
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

module.exports = { handleUpdateGoal };
