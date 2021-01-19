// import * as utils from "../utils/utils";
const utils = require("../utils/utils");
const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// Check whether endpoint is working
router.get("/test", (req, res) => {
  let filter = req.query;
  User.find(filter, (err, data) => {
    console.log("Query String: ", req.query);
    if (err) {
      console.log(err.stack);
      return res.status(500).send(err);
    }
    console.log(data.length);
    res.json(data);
  });
});

// Create new user
router.post("/create", async (req, res) => {
  let { useremail } = req.body;
  try {
    let checker = await User.findOne({ email: useremail });
    if (checker) {
      return res
        .status(404)
        .send(`Sorry, the account ${useremail} already exist! Please try again`);
    }
    const user = new User({ email: useremail });
    await user.save();
    res.status(201).send({ email: user.email });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({ error: err.message });
  }
});

// // Add friend
// router.post("/add", async (req, res) => {
//   //TODO: CHECK WHETHER IF YOU ARE BLOCKED BEFORE ADDING
//   let { useremail, friendemail } = req.body;
//   try {
//     // let checker = await User.findOne({ email: friendemail });
//     // if (!checker) {
//     //   return res
//     //     .status(404)
//     //     .send(
//     //       `Sorry, the account ${friendemail} does not exist! Please try again`
//     //     );
//     // }
//     await User.findOneAndUpdate(
//       { email: friendemail },
//       { $addToSet: { friends: useremail } },
//       { new: true }
//     ).then((data) => {
//       if (data) {
//         return res.json({ success: true });
//       }
//       return res
//         .status(404)
//         .send(
//           `Sorry, the account ${friendemail} does not exist! Please try again`
//         );
//     });

//     await User.findOneAndUpdate(
//       { email: useremail },
//       { $addToSet: { friends: friendemail } },
//       { new: true }
//     ).then((data) => {
//       if (data) {
//         return res.json({ success: true });
//       }
//       return res
//         .status(404)
//         .send(
//           `Sorry, the account ${useremail} does not exist! Please try again`
//         );
//     });
//   } catch (err) {
//     console.log(err.stack);
//     return res.status(500).send({ error: err });
//   }
// });

// Add friend
router.post("/add", async (req, res) => {
  //TODO: CHECK WHETHER IF YOU ARE BLOCKED BEFORE ADDING
  let { useremail, friendemail } = req.body;
  try {
    // let checker = await User.findOne({ email: friendemail });
    // if (!checker) {
    //   return res
    //     .status(404)
    //     .send(
    //       `Sorry, the account ${friendemail} does not exist! Please try again`
    //     );
    // }
    await User.findOneAndUpdate(
      { email: friendemail },
      { $addToSet: { friends: useremail } },
      { new: true }
    ).then((data) => {
      if (!data) {
        // return res.json({ success: true });
      }

    }).then(
      await User.findOneAndUpdate(
        { email: useremail },
        { $addToSet: { friends: friendemail } },
        { new: true }
      )
    ).then((data) => {
      if (data) {
        // return res.json({ success: true });
      }
      return res
        .status(404)
        .send(
          `Sorry, the account ${useremail} does not exist! Please try again`
        );
    }).then(()=>{
      return res.json({ success: true });
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ error: err });
  }
});

//List friends
router.get("/all", async (req, res) => {
  let { useremail } = req.body;
  await User.findOne({ email: useremail }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!data) {
      return res
        .status(404)
        .send(`Sorry, the account ${useremail} does not exist! Please try again`);
    }
    res.json(data);
  });
});

//Subscribe user
router.post("/sub", async (req, res) => {
  let { useremail, friendemail } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: useremail },
      { $addToSet: { subscribe: friendemail } },
      { new: true }
    ).then((data) => {
      if (data) {
        return res.json(data);
      }
      return res
        .status(404)
        .send(
          `Sorry, the account ${useremail} does not exist! Please try again`
        );
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ error: err });
  }
});

//Block user
router.post("/block", async (req, res) => {
  let { useremail, friendemail } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: useremail },
      { $addToSet: { block: friendemail } },
      { new: true }
    ).then((data) => {
      if (data) {
        return res.json(data);
      }
      return res
        .status(404)
        .send(
          `Sorry, the account ${useremail} does not exist! Please try again`
        );
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ error: err });
  }
});

//Get common friend
router.get("/common", async (req, res) => {
  let { useremail, friendemail } = req.body;

  // TODO: Get common friends
});

//List all friends that can receive update from me
router.get("/updatelist", async (req, res) => {
  // db.myCollection.find({'blocked.user': {$ne: 11}});
  //db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )
  /*

    This query will select all documents in the inventory collection where the qty field value does not equal 5 nor 15. The selected documents will include those documents that do not contain the qty field.

    If the field holds an array, then the $nin operator selects the documents whose field holds an array with no element equal to a value in the specified array (e.g. , , etc.).
*/
  let { useremail } = req.body;
  let f = [];
  try {
    const allfriends = await User.find({ email: useremail });
    console.log(allfriends);
    console.log(allfriends.friends);
    foreach(async (allfriends) => {
      let friend = await User.find({ email: allfriends.email });
      if (!friend.block.include(useremail)) {
        f.push(friend.email);
      }
    });
    console.log(2);
    return res.status(200).send(f);
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send({ error: err });
  }
});

//send update
router.get("/postupdate", async (req, res) => {
  let { useremail, friendemail } = req.body;
});

module.exports = router;
