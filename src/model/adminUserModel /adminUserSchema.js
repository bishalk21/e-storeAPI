import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive"
    },
    fName: {
        type: String,
        required: true,
        maxlength: [20, "First Name can not be more than 50 characters"],
    },
    lName: {
        type: String,
        required: true,
        maxlength: [20, "Last Name can not be more than 50 characters"],
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: true,
        maxlength: [20, "Email can not be more than 50 characters"],
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: [20, "Phone can not be more than 50 characters"],
    },
    address: {
        type: String,
        required: true,
        default: "n/a",
        maxlength: [100, "Address can not be more than 50 characters"],
    },
    dob: {
        type: Date,
        required: true,
        default: null,
    },
    emailValidationCode: {
        type: String,
        required: true,
        default: "n/a",
    },
}, {
    timestamps: true
})

export default mongoose.model("adminuser", adminUserSchema);