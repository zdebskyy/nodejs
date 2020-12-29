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
  password: {
    type: String,
    require: true,
  },

  subscription: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports.Contact = mongoose.model("ContactModel", contactsSchema);
