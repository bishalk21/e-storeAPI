import categorySchema from "./CategorySchema.js";

// insert category into the database
export const insertCategory = (obj) => {
    return categorySchema(obj).save();
}

//get all categories
export const getAllCategories = () => {
    return categorySchema.find();
}

//get category by id
export const getCategoryById = (id) => {
    return categorySchema.findById(id);
}