const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    mr_no: { type: String },
    his_status: { type: String },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    community_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }
}, {timestamps: true })

module.exports = mongoose.model('User', UserSchema);