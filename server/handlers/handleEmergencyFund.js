const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleEmergencyFund = async (req, res) => {
  // deconstruct req.body
  const {
    _id,
    income,
    currentSavings,
    monthlySavings,
    totalEmergencyFund,
    min,
    max,
  } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // calculate below minimum recommended
    const twoMonths = max / 3;
    const oneMonth = income;

    // calculate score
    let score = 0;
    if (totalEmergencyFund >= max) score = 100;
    else if (totalEmergencyFund >= min) score = 80;
    else if (totalEmergencyFund >= twoMonths) score = 70;
    else if (totalEmergencyFund >= oneMonth) score = 60;
    else score = 50;

    const query = { _id: ObjectId(_id) };
    let newValues = {};

    newValues = {
      $set: {
        "modules.emergencyfund": {
          isComplete: true,
          score,
          income,
          currentSavings,
          monthlySavings,
        },
      },
    };
    await db.collection("users").updateOne(query, newValues, (err, user) => {
      if (err) console.log(err);
      else {
        res.status(200).json({
          status: 200,
          _id: _id,
          module: {
            isComplete: true,
            score,
            income,
            currentSavings,
            monthlySavings,
          },
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

module.exports = { handleEmergencyFund };
