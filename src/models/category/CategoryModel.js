import CategorySchema from "./CategorySchema.js";

//insert category
export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

//get categories
export const getAllCategories = () => {
  return CategorySchema.find();
};

//get a categor
export const getCategoryById = (_id) => {
  return CategorySchema.findById(_id);
};

//get a categor
export const updateCategoryById = ({ _id, ...update }) => {
  return CategorySchema.findByIdAndUpdate(_id, update, { new: true });
};

//get a categor
export const hasClidCategoryById = async (parentId) => {
  const cat = await CategorySchema.findOne({ parentId });

  return cat?._id ? true : false;
};

//get a categor
export const deleteCategoryById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
