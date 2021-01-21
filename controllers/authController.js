const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registration(req, res) {
  console.log(req.body.password);
  const hashPassword = await userModel.passwordHash(req.body.password);
  console.log(hashPassword);
  const user = await new userModel({
    email: req.body.email,
    password: hashPassword,
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

  if (!user) {
    return res.status(400).json({ message: "Not found" });
  }

  await userModel.findByIdAndUpdate(user._id, {
    token: "",
  });

  return res.status(204).send();
}

module.exports = {
  registration,
  login,
  logout,
};
