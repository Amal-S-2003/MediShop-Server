const users = require("../model/userSchema");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  console.log("inside login function");

  const { email, password } = req.body;
  console.log(email, password);

  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // generate token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("invalid email or password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.register = async (req, res) => {
  console.log("inside register function");

  const { username, email, phoneNumber, address, password } = req.body;
 
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("User with this email is already exist");
    } else {
      console.log(
        username,
        email,
        phoneNumber,
        address,
        password,
      );

      const newUser = new users({
        username,
        email,
        phoneNumber,
        address,
        password, 
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.log(err);
    
    res.status(401).json(err);
  }
};

exports.editProfile = async (req, res) => {
  console.log("inside editProfile function");

  const { username, email, phoneNumber, address } = req.body;
  const userId = req.payload;
  console.log(username, email, phoneNumber, address, userId);

  try {
    await users.findByIdAndUpdate(userId, {
      username,
      email,
      phoneNumber,
      address,
    });

    res.status(200).json("Profile Updated SuccessFully");
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.getAllUsers = async (req, res) => {
  console.log("Inside getAllUsers function");

  try {
    const allUsers = await users.find({ role: { $ne: "admin" } }); // Exclude admin users
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getUserDetails = async (req, res) => {
  console.log("Inside getAllUsers function");
  const userId = req.payload;
  try {
    const user = await users.find({ _id: userId }); // Exclude admin users
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
