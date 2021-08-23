const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  notifications: {
    type: [Object],
    default: [],
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
