const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const uuid = require("uuid");

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
  verificationToken: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["verified", "created"],
    default: "created",
  },
});

userSchema.statics.passwordHash = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

userSchema.methods.createVerificationToken = async function () {
  this.verificationToken = uuid.v4();
  this.save();
};

userSchema.methods.sendVerificationEmail = async function () {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(this);
  const msg = {
    to: this.email,
    from: process.env.SENDGRID_VERIFIED_EMAIL,
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href='http://localhost:3000/api/auth/verify/${this.verificationToken}'>Click here to verify your email</a>`,
  };

  await sgMail.send(msg);
};

userSchema.statics.findByVerificationToken = async function (
  verificationToken
) {
  return await this.findOne({ verificationToken });
};

userSchema.statics.verifyUser = async function (userId) {
  return await this.findByIdAndUpdate(userId, {
    status: "verified",
    verificationToken: "",
  });
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
