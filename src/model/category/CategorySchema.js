import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    slug: { // slug is used to generate url
        type: String,
        required: true,
        unique: true,
        index: 1, // index is used to search the data in the database 
        maxlength: 50,
        trim: true, // trim is used to remove the white spaces from the beginning and end of the string
    },
    parentId: { // parentId is used to store the id of the parent category
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
})

export default mongoose.model("category", categorySchema);