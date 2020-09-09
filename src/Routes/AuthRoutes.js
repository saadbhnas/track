const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { emil, password } = req.body;

  try {
    const user = new User({ emil, password });
    await user.save();

    const token = jwt.sign({ UserId: user._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (err) {
    return res.status(244).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { emil, password } = req.body;

  if (!emil || !password) {
    return res.status(422).send({ error: "must provide emil and password" });
  }

  const user = await User.findOne({ emil });
  if (!user) {
    return res.status(404).send({ error: "Invalid email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
