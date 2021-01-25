const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  avatarURL: {
    type: String,
    default: "",
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

userSchema.statics.passwordHash = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.passwordCompare = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.resetToken = async function () {
  return await this.constructor.findByIdAndUpdate(this._id, {
    token: "",
  });
};

userSchema.methods.assignToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWTSECRET
  );
  return await this.constructor.findByIdAndUpdate(this._id, {
    token,
  });
};

module.exports.userModel = mongoose.model("User", userSchema);
