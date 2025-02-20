const mongoose = require("mongoose");

const BenefitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  eligibility: {
    type: String,
    enum: ["general", "community_only"],
    required: true,
    default: "general"
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

module.exports = mongoose.model("Benefit", BenefitSchema);
