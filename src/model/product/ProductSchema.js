import mongoose from "mongoose";
export const productSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
    },
    name: {
        type: String,
        required: true,
        maxlength: [20, "Name can not be more than 50 characters"],
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        index: 1,
        maxlength: [20, "SKU can not be more than 50 characters"],
    },
    description: {
        type: String,
        required: true,
        maxlength: [100, "Description can not be more than 50 characters"],
    },
    slug: {
        type: String,
        required: true,
        maxlength: [100, "Slug can not be more than 50 characters"],
        unique: true,
        index: 1,
    },
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
    }],
    thumbnail: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    salesPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    saleStartDate: {
        type: Date,
        default: null,
    },
    saleEndDate: {
        type: Date,
        default: null,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        max: 5,
        default: 5,
    }
}, {
    timestamps: true,
})

export default mongoose.model("Product", productSchema);