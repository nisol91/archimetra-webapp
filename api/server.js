//=======================best way to connect to mongodb atlas cloud

const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
// const logger = require("morgan");
// const Data = require("./data");

//endpoints
const businessRoute = require("./business.route");
const projectRoute = require("./project.route");
const formRoute = require("./form.route");

const API_PORT = 4040;
const app = express();
app.use(cors());
// const router = express.Router();

// this is our MongoDB database
const dbRoute = `mongodb+srv://default-user:default_users_psw_010203@cluster0-dqmij.gcp.mongodb.net/portfolio`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => // console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(express.json());
// app.use(logger("dev"));

app.use("/business", businessRoute);
app.use("/project", projectRoute);
app.use("/form", formRoute);

// launch our backend into a port
app.listen(API_PORT, () => {console.log('server up')})// console.log(`LISTENING ON PORT ${API_PORT}`));

//=============connection to cloud mongoDbAtlas Cluster

// const Express = require("express");
// const BodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;

// const CONNECTION_URL =
//   "mongodb+srv://default-user:jBGijO7RuVgVNqJg@cluster0-dqmij.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const DATABASE_NAME = "portfolio";

// var app = Express();

// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));

// var database, collection;

// app.listen(4040, () => {
//   MongoClient.connect(
//     CONNECTION_URL,
//     { useNewUrlParser: true },
//     (error, client) => {
//       if (error) {
//         throw error;
//       }
//       database = client.db(DATABASE_NAME);
//       collection = database.collection("project");
//       // console.log("Connected to `" + DATABASE_NAME + "`!");
//     }
//   );
// });
//===

// //================connection to local DB

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const PORT = 4040;
// const cors = require("cors");
// const mongoose = require("mongoose");
// const config = require("./DB.js");

// //endpoints
// const businessRoute = require("./business.route");
// const projectRoute = require("./project.route");
// const formRoute = require("./form.route");

// //connection to local DB
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {
//     // console.log("Database is connected!!!");
//   },
//   err => {
//     // console.log("Can not connect to the database" + err);
//   }
// );
// //====
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use("/business", businessRoute);
// app.use("/project", projectRoute);
// app.use("/form", formRoute);

// app.listen(PORT, function() {
//   // console.log("Server is running on Port:", PORT);
// });
