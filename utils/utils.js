// // const express = require("express");
// // const User = require("../models/userModel");

// // function returnErrIfNotExist (input){
// //     //Check if user exist, return error if user not exist
// //     try{
// //         let user =  User.findOne({email: input});
// //         if(!user){
// //             return res.status(401).send({ error: `Sorry, the account  "${input}" cannot be found! Please try again` });
// //         }
// //     } catch(err){
// //         console.log(err.stack);
// //         res.status(400).send({ error: err.message });
// //     }
// // }

// // function returnErrIfExist(input) {

// //     //Check if user exist, return error if user not exist
// //     try {
// //         let user = User.findOne({ email: input });
// //         if (user != {}) {
// //           return res
// //             .status(401)
// //             .send({
// //               error: `Sorry, the account ${input} already exist! Please try again`,
// //             });
// //         }
// //       } catch (err) {
// //         console.log(err.stack);
// //         res.status(400).send({ error: err.message });
// //       }
// // }

// // const express = require("express");
// // const User = require("../models/userModel");

// // module.exports.returnErrIfNotExist = async function (email) {
// //   //Check if user exist, return error if user not exist
// //   try {
// //     let user = await User.findOne({ email: email });
// //     if (!user) {
// //       throw `Sorry, the account  "${email}" cannot be found! Please try again`;
// //     }
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // module.exports.returnErrIfExist = async function (email) {
// //   //Check if user exist, return error if user not exist
// //   try {
// //     let user = await User.findOne({ email: email });
// //     if (user) {
// //       throw `Sorry, the account ${email} already exist! Please try again`;
// //     }
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// const express = require("express");
// const User = require("../models/userModel");

// module.exports.returnErrIfNotExist = async function (email) {
//   //Check if user exist, return error if user not exist

//   let user = await User.findOne({ email: email });
//   if (!user) {
//     throw `Sorry, the account  "${email}" cannot be found! Please try again`;
//   }
// };

// module.exports.returnErrIfExist = async function (email) {
//   //Check if user exist, return error if user not exist
//   await User.findOne({ email: email }, (err, data) => {
//     if (err) {
//       // console.log(err.stack);
//       throw res.status(500).send(err);
//     }
//     if (data) {
//       throw res.status(400).send(`Sorry, the account ${email} already exist! Please try again`);
//     }
//   });
// };
