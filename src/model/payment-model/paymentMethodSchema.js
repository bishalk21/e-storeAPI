import mongoose from "mongoose";

const pmSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        index: 1,
    },
    status: {
        type: String,
        default: "inactive",
    },
    description: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
})

export default mongoose.model("PaymentMethod", pmSchema);