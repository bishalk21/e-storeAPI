import ProductSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
    return ProductSchema(obj).save();
}

// get

export const getProduct = (filter) => {
    return ProductSchema.find(filter);
}

// by _id
export const getProductById = (_id) => {
    return ProductSchema.findById(_id);
}

// single product
export const getSingleProduct = (filter) => {
    return ProductSchema.find(filter);
}

// add
export const addProduct = (obj) => {
    return ProductSchema(obj).save();
}

// update
export const updateProduct = ({
    _id,
    ...update
}) => {
    return ProductSchema.findByIdAndUpdate(_id, update, {
        new: true
    });
}

//delete
export const deleteProductById = (_id) => {
    return ProductSchema.findByIdAndDelete(_id);
}