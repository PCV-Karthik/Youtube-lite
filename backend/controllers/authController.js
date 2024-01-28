const mongoose = require("mongoose");
const User = require("../models/userModel");
const tryCatch = require("../tryCatch");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = tryCatch(async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({email: email });
  if (userExist) {
    console.log(email);
    throw new Error("User already exists!!");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({ ...req.body, password: hash });
  if (newUser) {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password, ...others } = newUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  }
});

const signIn = tryCatch(async(req,res)=>{
    const user = await User.findOne({ name: req.body.name });
    if (!user) throw new Error( "User not found!");

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) throw new Error("Wrong Credentials!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: false,
      })
      .status(200)
      .json(others);
});

const googleAuth = tryCatch(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
});

module.exports = { signUp,signIn,googleAuth };
