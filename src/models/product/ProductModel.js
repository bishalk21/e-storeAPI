import ProductSchema from "./ProductSchema.js";

export const getAllProducts = () => {
  return ProductSchema.find();
};

export const getProductById = (_id) => {
  return ProductSchema.findById(_id);
};
export const getSelectedProducts = (filter) => {
  return ProductSchema.find(filter);
};

export const getSingleProduct = (filter) => {
  return ProductSchema.find(filter);
};

export const addProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const updateProductById = ({ _id, ...rest }) => {
  return ProductSchema.findByIdAndUpdate(_id, rest);
};

export const deleteProductById = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
