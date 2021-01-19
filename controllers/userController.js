const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registration(req, res) {
  const user = await new userModel({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  await user.save();

  return res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
}

async function login(req, res) {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "Not found" });
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTSECRET
  );

  await userModel.findByIdAndUpdate(user._id, {
    token,
  });

  return res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
  });
}

async function logout(req, res) {
  const user = req.user;

  await userModel.findByIdAndUpdate(user._id, {
    token: "",
  });

  return res.status(204).send();
}

async function getCurrentUser(req, res) {
  const { email, subscription } = req.user;

  return res.status(200).send({ email, subscription });
}

async function getUsersFreeSubsciption(req, res) {
  const { sub } = req.query;

  if (!sub) {
    return res.status(400).json({ message: "Bad request" });
  }

  const freeSubUser = await userModel.find({ subscription: { $eq: sub } });

  return res.status(200).json(freeSubUser);
}

async function updateUserSubscription(req, res) {
  const { _id } = req.user;

  const { subscription } = req.body;

  await userModel.findByIdAndUpdate(_id, {
    $set: { subscription },
  });

  return res.status(200).json({ message: "subscription updated" });
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  getUsersFreeSubsciption,
  updateUserSubscription,
};
