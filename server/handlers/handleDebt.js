const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleDebt = async (req, res) => {
  // deconstruct req.body
  const {
    _id,
    income,
    housing,
    loanPayments,
    creditCards,
    otherDebt,
    totalMonthlyDebt,
  } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // calculate debt ratio
    const debtRatio = Math.round((totalMonthlyDebt / income) * 100);

    // calculate score
    let score = 0;
    if (debtRatio >= 41) score = 60;
    else if (debtRatio >= 31) score = 80;
    else if (debtRatio < 31) score = 100;

    const query = { _id: ObjectId(_id) };
    let newValues = {};

    newValues = {
      $set: {
        "modules.debt": {
          isComplete: true,
          score,
          income,
          housing,
          loanPayments,
          creditCards,
          otherDebt,
          debtRatio,
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
            housing,
            loanPayments,
            creditCards,
            otherDebt,
            debtRatio,
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

module.exports = { handleDebt };
