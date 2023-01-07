import CategorySchema from "./categorySchema.js";

// insert category
export const addCategory = (obj) => {
  return CategorySchema(obj).save();
};
