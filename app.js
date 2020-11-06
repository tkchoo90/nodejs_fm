const express = require("express");
const path = require("path");

const app = express();


app.get("/", (req, res) =>{
    res.send("Hello World!");
});

app.get("/2", (req, res) =>{
    res.send("Hello again!!");
});

app.listen(3000, () =>{
    console.log("Server running at port 3000");
})

