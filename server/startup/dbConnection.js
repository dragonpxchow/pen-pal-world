import mongoose from "mongoose";

const dbConnection = (app) => {
  console.log("Node server environment:", process.env.NODE_ENV);
  console.log("Connecting to mongodb+srv ....");

  // build db connection URL
  process.env.CONNECTION_URL =
    "mongodb+srv://" +
    process.env.REACT_APP_MONGO_DB_USER +
    ":" +
    process.env.REACT_APP_MONGO_DB_PASSWORD +
    "@reactcluster.4ttd3.mongodb.net/pen-pal-world?retryWrites=true&w=majority";

  // get port depending on environment
  const port = process.env.PORT || "5000";

  //console.log("process.env.CONNECTION_URL >>>>>", process.env.CONNECTION_URL);

  // attemp connecting to mongo db
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() =>
      app.listen(port, () => console.log(`Server running on port: ${port}`))
    )
    .catch((error) => console.log(error.message));

  mongoose.set("useFindAndModify", false);
};

export default dbConnection;
/*
// https://www.mongodb.com/cloud/atlas
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@reactcluster.4ttd3.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
