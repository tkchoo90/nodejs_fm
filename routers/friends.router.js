const express = require("express");
const router = express.Router();
const dbcontext = require("../sqlconnection");


router.get("/", (req,res) => {
    dbcontext.query("SELECT * from friends", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

router.get("/hello", (req, res) =>{
    res.send("Hello Friends!!");
});

module.exports = router;