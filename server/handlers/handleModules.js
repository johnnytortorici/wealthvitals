const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleModules = async (req, res) => {
  // deconstruct req.body
  const { _id } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("wealthvitals");
    console.log("Connected!");

    // find user in users collection
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(_id) }, (err, user) => {
        if (err) console.log(err);
        if (user) {
          const { modules } = user;
          res.status(200).json({ status: 200, modules: modules });
        } else {
          res
            .status(404)
            .json({ status: 404, message: "No user found with that id." });
        }
      });
  } catch {
    res.status(500).json({ status: 500, message: "Something went wrong." });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleModules };
