import CategorySchema from "./categorySchema.js";

// insert category
export const addCategory = (obj) => {
  return CategorySchema(obj).save();
};

// get all category
export const getAllCategory = () => {
  return CategorySchema.find();
};

// get category by id
export const getCategoryById = (_id) => {
  return CategorySchema.findById(_id);
};

// update category
export const updateCategoryById = ({ _id, ...update }) => {
  return CategorySchema.findByIdAndUpdate(_id, update, { new: true });
};

// has child category
export const hasChildCategory = async (parentCatId) => {
  const catsWithParent = await CategorySchema.findOne({ parentCatId });

  return catsWithParent?._id ? true : false;
};

// delete category
export const deleteCategoryById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
