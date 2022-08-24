import categorySchema from "./CategorySchema.js";

// insert category into the database
export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};

//get all categories
export const getAllCategories = () => {
  return categorySchema.find();
};

//get category by id
export const getCategoryById = (_id) => {
  return categorySchema.findById(_id);
};

//update category
export const updateCategoryById = ({ _id, ...rest }) => {
  console.log(rest);
  return categorySchema.findByIdAndUpdate(_id, rest, {
    new: true,
  });
};

export const hasChildCategoryById = async (parentId) => {
  const cats = await categorySchema.findOne({ parentId });
  return cats?._id ? true : false;
};

export const deleteCategoryById = (_id) => {
  return categorySchema.findByIdAndDelete(_id);
};
