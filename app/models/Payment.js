const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    enum: ["successful", "failed", "pending"],
    required: true
  },
  payment_method: {
    type: String,
    enum: ["credit_card", "bank_transfer", "e-wallet"],
    required: true
  },
  transaction_id: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
