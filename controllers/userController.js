const { userModel } = require("../models/userModel");

async function getCurrentUser(req, res) {
  const { email, subscription } = req.user;

  return res.status(200).send({ email, subscription });
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
  getCurrentUser,
  updateUserSubscription,
};
