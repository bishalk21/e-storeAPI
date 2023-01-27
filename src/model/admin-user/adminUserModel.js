import AdminUserSchema from "./adminUserSchema.js";

// insert new user
export const addNewUser = (user) => {
  return AdminUserSchema(user).save();
};

// update user
export const updateOneUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};

// find a user
export const findOneUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};

// find all user
export const findAllAdminUser = () => {
  return AdminUserSchema.find();
};

// delete user
export const deleteAdminUser = (_id) => {
  return AdminUserSchema.findByIdAndDelete(_id);
};
