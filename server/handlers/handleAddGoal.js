const { MongoClient, ObjectId } = require("mongodb");
const moment = require("moment");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleAddGoal = async (req, res) => {
  // deconstruct req.body
  const {
    _id,
    type: type,
    description: description,
    category: category,
    goalAmount: goalAmount,
    starting: starting,
    monthly: monthly,
    dueDate: dueDate,
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

    if (type === "small") {
      newValues = {
        $push: {
          "modules.goals.small": {
            description,
            category,
            goalAmount,
            starting,
            monthly,
            dueDate,
            estimatedDate,
            goalStatus,
          },
        },
      };
    } else if (type === "medium") {
      newValues = {
        $push: {
          "modules.goals.medium": {
            description,
            category,
            goalAmount,
            starting,
            monthly,
            dueDate,
            estimatedDate,
            goalStatus,
          },
        },
      };
    } else if (type === "large") {
      newValues = {
        $push: {
          "modules.goals.large": {
            description,
            category,
            goalAmount,
            starting,
            monthly,
            dueDate,
            estimatedDate,
            goalStatus,
          },
        },
      };
    }

    await db.collection("users").updateOne(query, newValues, (err, user) => {
      if (err) console.log(err);
      else {
        res.status(200).json({
          status: 200,
          _id: _id,
          goal: { estimatedDate, targetDate, goalStatus, duration },
        });
        user.modifiedCount !== 1 && console.log("Module not updated.");
      }
    });
  } catch {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleAddGoal };
