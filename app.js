const express = require("express");
const path = require("path");

const app = express();


app.get("/", (req, res) =>{
    res.send("Hello World!");
});

app.listen(3000, () =>{
    console.log("Server running at port 3000");
})

