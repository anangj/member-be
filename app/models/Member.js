const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    membership_status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "pending",
    },
    benefit_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Benefit",
      },
    ],
    expiry_date: {
      type: Date,
    },
    e_card: {
      qr_code: {
        type: String,
      },
      issued_at: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", MemberSchema);
