const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

module.exports = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "Not authorized headers" });
  }
  let type;
  let token;

  if (!header.includes(" ")) {
    token = header;
  } else {
    [type, token] = header.split(" ");
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized token" });
  }

  const userId = jwt.verify(token, process.env.JWTSECRET).id;

  const user = await userModel.findById(userId);

  req.user = user;

  next();
};
