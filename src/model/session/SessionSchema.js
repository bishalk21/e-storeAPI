import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    associates: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        default: null,
    },
    refreshJWT: {
        type: String,
        default: "",
    },

}, {
    timestamps: true
})

export default mongoose.model("session", sessionSchema);