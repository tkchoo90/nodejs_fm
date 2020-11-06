require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const dbcontext = require("./sqlconnection");
const friendsRoutes = require("./routers/friends.router");
const path = require("path");
const cors = require("cors");






const app = express();

/***************  MIDDLEWARES   ********************/
app.use(cors());
app.use(bodyParser.json());
app.use("/friends", friendsRoutes);

app.get("/", (req, res) =>{
    res.send("Hello World!");
});

app.get("/2", (req, res) =>{
    res.send("Hello again!!");
});

app.listen(process.env.PORT, () =>{
    console.log("Server running at port 3000");
})

