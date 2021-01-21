const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {
    type: String,
    require: false,
    default: "",
  },
});

userSchema.static.passwordHash = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports.userModel = mongoose.model("User", userSchema);
