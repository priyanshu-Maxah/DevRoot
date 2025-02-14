const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) =>{
  try{
    // Read the token from the req cookies
    const {token} = req.cookies;
    

    if(!token){
      throw new Error("Token is not Valid!!!!")
    }

    // Validate the token
    const decodedObj = await jwt.verify(token, "DEV@Link$143");

    const {_id} = decodedObj;

    // Find the User
    const user = await User.findById(_id);
    

    if(!user){
      throw new Error("User not Found")
    }

    req.user = user;
    next();
    
  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { userAuth };
