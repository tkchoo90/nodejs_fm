require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/users.router");
const path = require("path");
const cors = require("cors");

//DB connection
require("./models/db");

const app = express();

/***************  MIDDLEWARES   ********************/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Homepage!");
});

// localhost:3000/
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
