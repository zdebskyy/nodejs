const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  subscription: {
    type: String,
    default: "free",
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports.Contact = mongoose.model("ContactModel", contactsSchema);
