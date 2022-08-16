import adminUserSchema from "./adminUserSchema.js";

// insert new admin user
export const insertAdminUser = (obj) => {
  return adminUserSchema(obj).save();
};

// update admin user
export const updateAdminUser = (filter, update) => {
  return adminUserSchema.findOneAndUpdate(filter, update, {
    new: true,
  });
};

// fina a admin user
export const findOneAdminUser = (filter) => {
  return adminUserSchema.findOne(filter);
};