const express = require("express");
const router = express.Router();
const Signup = require("../models/signup");
const { encrypt } = require("../Modules/hashing.js");
var md5 = require('md5');


const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./token');

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var dynamicSalt = generateRandomString(6);
// console.log(generateRandomString(6));

//configuting the dotenv
const dotenv = require('dotenv');
dotenv.config();


router.post("/signup", async (req, res) => {
  try {
    const user = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: encrypt(req.body.password + dynamicSalt),
      dySalt: dynamicSalt,
    });
    console.log(user);
    const userRegistered = await user.save();
    res.status(201).redirect("/login");
  } catch (err) {
    //TODO - Shows error to user
    res.status(404).send({message: "Internal Server Error"});
  }
});

router.post("/login", async (req, res) => {
  try {
    const mail = req.body.email;
    // user input password
    Signup.findOne({ email: mail }, function (err, foundUser) {
      const password = req.body.password + foundUser.dySalt;
      if (err) {
        res.status(400).send(err);
      } else {
        if(foundUser){
          const databasePass = foundUser.password;
          const hashedPass = md5(password);
          // console.log("DatabasePass" + databasePass)
          // console.log("HashedPass" + hashedPass)
          if (databasePass === hashedPass) {
            localStorage.setItem("token", foundUser._id);
            res.status(201).redirect("/");
          } else {
            res.status(403).send({message: "Incorrect Password!!"});
          }
        } else {
          res.status(404).send({message: "This email is not registered!!"});
        }
      }
    });
  } catch (err) {
    //TODO - Shows error to user
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;