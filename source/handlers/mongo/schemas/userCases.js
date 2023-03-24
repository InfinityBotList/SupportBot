const mongoose = require("mongoose");

const userCases = mongoose.Schema({
    user: {
        type: String,
        default: null,
        required: true
    },
    guild: {
        type: String,
        default: null,
        required: true
    },
    reason: {
        type: String,
        default: null,
        required: true
    },
    action: {
        type: String,
        default: null,
        required: true
    },
    moderator: {
        type: String,
        default: null,
        required: true
    },
    case: Number,
    time: String,
    duration: String
});

module.exports = mongoose.model("userCases", userCases);