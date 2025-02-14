const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Project:ProjectP%40122@cluster0.hsugq.mongodb.net/devLink"
  );
};

module.exports = connectDB;

