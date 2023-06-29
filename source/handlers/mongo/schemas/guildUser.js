const mongoose = require("mongoose");

const guildUsers = mongoose.Schema({
    user: {
        type: String,
        default: null,
    },
    userName: {
        type: String,
        default: null,
    },
    cmdBlacklist: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("guildUser", guildUsers);