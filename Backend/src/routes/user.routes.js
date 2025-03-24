const express = require("express");
const { validateSignUpData } = require("../utils/user.validate");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    validateSignUpData(req);

    const { name, email, password, mobileNo, role, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const user = new User({
      name,
      email,
      mobileNo,
      password: hashedPassword,
      role,
      address,
    });
    await user.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.status(400).send("Error While Saving the user : " + error.message);
  }
});

module.exports = userRouter;
