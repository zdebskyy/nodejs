const { userModel } = require("../models/userModel");
const { avatarCreate } = require("../avatar/avatarCreater");

async function registration(req, res) {
  const hashPassword = await userModel.passwordHash(req.body.password);

  const existingUser = await userModel.findByEmail(req.body.email);
  if (existingUser) {
    return res.status(409).json({ message: "Email duplicate" });
  }

  console.log(process.env.SENDGRID_API_KEY);

  const avatarName = await avatarCreate();

  const avatarUrlString = `http://localhost:${process.env.PORT}/images/${avatarName}`;

  const user = await new userModel({
    email: req.body.email,
    password: hashPassword,
    avatarURL: avatarUrlString,
  });

  await user.save();

  return res.status(201).json({
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
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
