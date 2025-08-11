const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: String,
  skills: [String],
  linkedin: String,
  walletAddress: String,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);