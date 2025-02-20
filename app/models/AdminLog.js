const mongoose = require("mongoose");

const AdminLogSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // adjust the reference if your admin model has a different name
    required: true
  },
  action_type: {
    type: String,
    enum: ["approve", "resend e-card"],
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // adjust the reference if needed
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("AdminLog", AdminLogSchema);
