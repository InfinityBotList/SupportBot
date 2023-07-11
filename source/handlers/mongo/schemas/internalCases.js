const mongoose = require("mongoose");

const internalCases = mongoose.Schema({
  user: {
    type: String,
    default: null,
    required: true,
  },
  guild: {
    type: String,
    default: null,
    required: true,
  },
  reason: {
    type: String,
    default: null,
    required: true,
  },
  action: {
    type: String,
    default: null,
    required: true,
  },
  moderator: {
    type: String,
    default: null,
    required: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  case: Number,
  time: String,
  duration: String,
  level: String,
  start: String,
  end: String
});

module.exports = mongoose.model("internalCases", internalCases);