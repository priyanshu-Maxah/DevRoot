const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Password is not strong',
    },
  },
  avatar: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: "Give string is not an URL",
    },
  },
  about: {
    type: String,
    maxLength: [500, "Too many words"],
    trim: true,
  },
  skills: {
    type: [String],
    validate: {
      validator: function () {
        return this.skills.length < 16;
      },
      message:
        "Too many skills, make number of skills less than or equal to 15",
    },
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = jwt.sign({ _id: user._id }, "DEV@Link$143", {
        expiresIn: "1d",
      });

      return token;
}

userSchema.methods.validatePassword = async function(password){
     const user = this;
     const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);