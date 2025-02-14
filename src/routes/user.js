const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionReq");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA =  "firstName lastName avatar about skills age gender";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/reviewed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionReq = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate('fromUserId', USER_SAFE_DATA);


    res.json({ 
        message: "Data Fetched Successfully", 
        data: connectionReq 
    });
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) =>{
    try {
        const loggedIn = req.user;

        const connectionReq = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedIn._id, status: "accepted"},
                {fromUserId: loggedIn._id, status: "accepted"}
            ],
        }).populate('fromUserId', USER_SAFE_DATA)
          .populate('toUserId', USER_SAFE_DATA);

        // Data cleanUp
        const data = connectionReq.map((row) => {
        if(row.fromUserId._id.toString() === loggedIn._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
    });
        res.json({data})

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

userRouter.get("/user/feed", userAuth, async (req, res)=>{

    try {
        /*
        /// User should see all the cards except(ignore):
        1. his oun card
        2. his connection
        3. ignore people
        4. already send connection request 
        */ 

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.page) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
         

       const loggedInUser = req.user;

        // find all connection request (sent + received)
       const connectionReq = await ConnectionRequest.find({
        $or: [{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}],
       }).select("fromUserId toUserId");

       const hideUsersFromFeed = new Set();

       connectionReq.forEach(req => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
       });

       const user = await User.find({
        $and:[
            {_id: {$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedInUser._id}}
        ]
       }).select(USER_SAFE_DATA).skip(skip).limit(limit)

       res.send(user);

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = userRouter;
