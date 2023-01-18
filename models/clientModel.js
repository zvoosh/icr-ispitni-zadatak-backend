const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favoritePlace: {
    type: [String],
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false
  }
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
