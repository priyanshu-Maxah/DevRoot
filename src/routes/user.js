const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionReq");
const userRouter = express.Router();

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/reviewed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionReq = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate('fromUserId', "firstName lastName avatar about skills age gender");


    res.json({ 
        message: "Data Fetched Successfully", 
        data: connectionReq 
    });
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

module.exports = userRouter;
