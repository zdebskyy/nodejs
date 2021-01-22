const { userModel } = require("../models/userModel");

async function registration(req, res) {
  const hashPassword = await userModel.passwordHash(req.body.password);
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
  if (!(await user.passwordCompare(req.body.password))) {
    return res.status(401).json({ message: "Wrong password" });
  }

  await user.assignToken();

  const { token } = await user.assignToken();

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

  const userToBeLogouted = await user.resetToken();

  if (!userToBeLogouted) {
    return res.status(400).json({ message: "Bad request" });
  }

  return res.status(204).send();
}

module.exports = {
  registration,
  login,
  logout,
};
