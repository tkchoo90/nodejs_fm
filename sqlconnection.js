require("dotenv").config();
const mysql = require("mysql");

let host = process.env.dbhost;
let user = process.env.dbuser;
let password = process.env.dbpassword;

const mysqlConnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: "fm",
    multipleStatements: true
});

console.log(process.env.dbhost);


mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = mysqlConnection;
