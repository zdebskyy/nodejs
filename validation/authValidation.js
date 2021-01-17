const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

module.exports = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "Not authorized headers" });
  }

  const [type, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Not authorized token" });
  }

  const userId = jwt.verify(token, process.env.JWTSECRET).id;

  const user = await userModel.findById(userId);

  console.log(user);
  req.user = user;

  next();
};
