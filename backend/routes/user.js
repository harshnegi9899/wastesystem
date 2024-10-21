const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, role, address, phoneNumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber,
    });
    await newUser.save();
    // console.log("New user: ", newUser);
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      "badsecret"
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, "badsecret");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in" });
  }
});

module.exports = router;
