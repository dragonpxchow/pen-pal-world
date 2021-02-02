import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./server/startup/routes.js";
import productionMiddleware from "./server/startup/productionMiddleware.js";
import dbConnection from "./server/startup/dbConnection.js";
import path from "path";
//import __dirname from "path";

//  loads the env variables into the process.env
dotenv.config(); // from .env
dotenv.config({ path: ".env." + process.env.NODE_ENV }); // from custome env file eg: .env.development or .env.production etc

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//app.use(error);

// setup all routes
routes(app);

// add production milldeware
productionMiddleware(app);

// get current root directory.  const __dirname = path.resolve() return the same
const __dirname = path
  .join(path.dirname(decodeURI(new URL(import.meta.url).pathname)))
  .replace(/^\\([A-Z]:\\)/, "$1");

// serve static files from the React frontend app
app.use(express.static("client/build"));
// anything that doesn't match the above, send back index.html

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(path.resolve(), "client", "build", "index.html"));
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

/*
app.get("/", (req, res) => {
  res.send("Hello, Welcome Project Tracker API");
});
*/

// db connection
dbConnection(app);
