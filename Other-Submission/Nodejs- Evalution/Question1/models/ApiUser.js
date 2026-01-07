const mongoose = require("mongoose");

const apiUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  creatdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ApiUser", apiUserSchema);
