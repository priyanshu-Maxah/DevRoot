const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//Profile route
// get JWT token in cookies from Auth MiddleWare
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;


    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    loggedInUser.save();
   

    // res.send(`${loggedInUser.firstName}  your Profile updated successfully`)
    res.json({message: `${loggedInUser.firstName}  your Profile updated successfully`, data :loggedInUser});
  } catch (error) {
    res.status(400).send("Error Message: " + error.message);
  }
});

module.exports = profileRouter;
