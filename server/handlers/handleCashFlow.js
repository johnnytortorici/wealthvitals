const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleCashFlow = async (req, res) => {
  // deconstruct req.body
  const {
    _id,
    income,
    totalNeeds,
    needs,
    totalWants,
    wants,
    totalSavings,
    savings,
  } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // calculate percentages
    const needsPercent = (totalNeeds / income) * 100;
    const wantsPercent = (totalWants / income) * 100;
    const savingsPercent = (totalSavings / income) * 100;

    // calculate score
    let score = 0;
    if (savingsPercent >= 20) score = 100;
    else if (savingsPercent >= 15) score = 90;
    else if (savingsPercent >= 10) score = 80;
    else if (savingsPercent >= 5) score = 70;
    else if (savingsPercent > 0) score = 60;
    else score = 50;

    const query = { _id: ObjectId(_id) };
    let newValues = {};

    newValues = {
      $set: {
        "modules.cashflow": {
          isComplete: true,
          score,
          income,
          needs,
          wants,
          savings,
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
            needs,
            wants,
            savings,
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

module.exports = { handleCashFlow };
