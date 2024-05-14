const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  stocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],

  profileImage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
