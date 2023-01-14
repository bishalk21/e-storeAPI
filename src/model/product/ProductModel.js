import ProductSchema from "./ProductSchema.js";

// insert product
export const addProducts = (obj) => {
  return ProductSchema(obj).save();
};

// get all products
export const getAllProducts = () => {
  return ProductSchema.find();
};

// get selected product
export const getSelectedProduct = (filter) => {
  return ProductSchema.find(filter);
};

// get single product by id
export const getSingleProductById = (_id) => {
  return ProductSchema.findById(_id);
};

// update product by Id
export const updateProductById = ({ _id, ...rest }) => {
  return ProductSchema.findByIdAndUpdate({ _id, rest });
};

// delete product
export const deleteProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
