const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    default: "active"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Community", CommunitySchema);
