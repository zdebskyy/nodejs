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

  subscription: String,
  token: String,
});

module.exports.Contact = mongoose.model("contacts", contactsSchema);
