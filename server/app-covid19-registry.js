/**
 * Application entry point
 * @author: Francois LeBouthillier
 */
const path = require("path");
const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config({ path: __dirname + "/.env" });
process.env.RUN_MODE = "prod";

/* -------------------------------------------------------------------------- */
/*                                Routes import                               */
/* -------------------------------------------------------------------------- */
const entryRoutes = require("./routes/entry");
const questionRoutes = require("./routes/question");
const userRoutes = require("./routes/user");

/* -------------------------------------------------------------------------- */
/*                             Basic configuration                            */
/* -------------------------------------------------------------------------- */
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(
  "/images",
  express.static(path.join(__dirname, process.env.IMAGE_FOLDER))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/* -------------------------------------------------------------------------- */
/*                             Routes declaration                             */
/* -------------------------------------------------------------------------- */
app.use("/entry", entryRoutes);
app.use("/question", questionRoutes);
app.use("/user", userRoutes);

/* -------------------------------------------------------------------------- */
/*                               Error handling                               */
/* -------------------------------------------------------------------------- */
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const route = error.route;
  const endPoint = error.endPoint;

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  let errorMessage = `[${currentTime}] [Status: ${status}] `;

  if (route !== undefined && endPoint !== undefined) {
    errorMessage += `[route: ${route}, endPoint: ${endPoint}] `;
  }
  errorMessage += message;

  console.log(errorMessage);

  res.status(status).json({
    message: message
  });
});

app.listen(process.env.PORT);
