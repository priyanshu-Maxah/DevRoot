const mongoose = require('mongoose');

const connectionReqSchema  = mongoose.Schema({

    fromUserId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference to the user collection(Table)
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum:{
            values: ["pending", "ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    },
},
  {
    timestamps: true
  }
);

// pre save
connectionReqSchema.pre("save", function (next) {
    // checking if fromUserId is same as toUserId
    const connectionRequest = this
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("You Could not send request to yourself");
    }
    next();
  });

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionReqSchema
);

module.exports = ConnectionRequestModel;