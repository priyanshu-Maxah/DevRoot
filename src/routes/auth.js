const express = require("express");
const { validateSingUpdate } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

// Signup route
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSingUpdate(req);

    const { firstName, lastName, emailId, password, avatar, about, skills, age, gender } = req.body;

    // Encrypt the Password
    const passHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passHash,
      avatar, 
      about, 
      skills,
      age,
      gender,
    });

    await user.save();
    res.send("User added successfully!!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// Login route
authRouter.post("/login", async (req, res) => {
    try {
      // Validation of Data
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
  
      if (!user) {
        throw new Error("Invalid credentials");
      }
  
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        // Create a JWT Token
        const token = await user.getJWT();
  
        // And the token to cookie and Response back to the user
        res.cookie("token", token,{
         expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        });
  
        res.send("Login successfully!!!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("Error saving the user: " + err.message);
    }
  });

// Logout Route
authRouter.post("/logout", async (req, res) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout Successfully!!");
});

module.exports = authRouter;
  