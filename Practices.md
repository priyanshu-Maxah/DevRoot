
/*//////////////////////////////////////////////////////////////////////*/

// Dummy API //

/*
/// Get user by Email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

/// Feed API - GET all users in database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("No users found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

/// Delete User from Database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

/// Update data of user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

*/

/*//////////////////////////////////////////////////////////////////////*/

// Find the user using some find() //

/*
app.get("/user", async (req, res) =>{
  const userAge = req.body.age;
  const userGender = req.body.gender;

 try {
  const user = await User.find({age: userAge, gender:userGender});
  if(user.length === 0){
    res.status(400).send("Something wrong user not found ");
  }else{
    res.send(user);
  }
 } catch (error) {
  res.status(400).send("Something wrong user not found :-", err.message);
 }
})*/

// Get user by Email
/*app.get("/user", async (req, res) => {
  
  const userEmail = req.body.emailId;
  
  try {
    const user = await User.find({emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("Something wrong user not found :-", err.message);
  }
});*/

/*//////////////////////////////////////////////////////////////////////*/

// Sending static data //

// Creating a new instance of the User model
/*
  const user = new User({
    firstName: "John",
    lastName: "Martin",
    emailId: "john@gmail.com",
    password: "JohnM@112",
    age: "22",
    gender: "Male"
  });

  try{
    await user.save();
    res.send("User added successfully!!! ");
  }catch(err){
    res.status(400).send("Error saving the user:-", err.message);
  }
*/

/*//////////////////////////////////////////////////////////////////////*/

/// Authentication Middleware ///

/*
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);


app.get("/admin/getAllData", (req, res) => {

  res.send("All admin Data Sent");
});

app.post("/user", (req, res) => {
  res.send("User Logged in successfully!!");
});

app.get("/user", userAuth, (req, res) => {
    res.send("All user Data Sent");
  });


app.get("/admin/deleteUser", (req, res) => {

  res.send("Delete a User");
});

*/

/*//////////////////////////////////////////////////////////////////////*/

//  next()
/*
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handing the route user 1!!!");
    next();
    /// res.send("Response.....");
  },
  (req, res, next) => {
    console.log("Handing the route user 2!!!");
    next();
    /// res.send("2nd Response!!");
  },
  (req, res, next) => {
    console.log("Handing the route user 3!!!");
    next();
    /// res.send("3nd Response!!");
  },
  (req, res, next) => {
    console.log("Handing the route user 4!!!");
    res.send("4nd Response!!");
    /// next();
  }
);


app.use("/", (req, res, next)=>{
    next();
})

app.get("/user", (req, res) => {
  console.log("Handing the route user 2!!!");
  res.send(" Route Handling");
});

*/

/*//////////////////////////////////////////////////////////////////////*/

// This is Perfect order of router set
/*
app.use("/test/1",(req, res) =>{
    res.send("Hello From the server 2.......");
})

app.use("/test",(req, res) =>{
    res.send("Hello From the server 1");
})

app.use("/",(req, res) => {
    res.send("Hello nice ");
})
*/

/*//////////////////////////////////////////////////////////////////////*/

// That are all method //

/*
/// This will only handle GET call to /user

app.get("/user",(req, res) =>{
    res.send({firstName : "John", lastName: "Martin"});
})

app.post("/user" , (req, res) =>{
    res.send("Data successfully saved yo the DataBase!");
})

app.put("/user" , (req, res) =>{
    res.send("Nice PUT called successfully);
})

app.patch('/user' , (req, res)=>{
    res.send("Nice PATCH called successfully);
})

app.delete("/user", (req, res)=>{
    res.send("Deleted successfully);
})

/// This will match all the method API calls to /test
app.use("/test",(req, res) => {
    res.send("Hello nice ");
})*/

/*//////////////////////////////////////////////////////////////////////*/

// Dynamic Parameter Passing //
/*
app.get("/user/:userId/:name/:password", (req, res)=>{
    console.log(req.params);
    res.send({firstName : "John", lastName: "Martin"});
})
*/

/*//////////////////////////////////////////////////////////////////////*/

// Regex passing in Route //
/*
app.get(/.*fly$/, (req, res)=>{
    res.send({firstName : "John", lastName: "Martin"});
})

app.get("/a(bc)?d", (req, res)=>{
    res.send({firstName : "John", lastName: "Martin"});
})
*/

/*//////////////////////////////////////////////////////////////////////*/

// Special Characters in Routing //
/*
app.get("/ab?cd", (req, res)=>{
    res.send({firstName : "John", lastName: "Martin"});
})

app.get("/ab+cd", (req, res)=>{
    res.send({firstName : "John", lastName: "Martin"});
})

app.get("/ab*cd", (req, res)=>{
    res.send({firstName : "John", lastName: "Martin"});
})
*/
/*//////////////////////////////////////////////////////////////////////*/
