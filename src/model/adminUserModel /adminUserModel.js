import adminUserSchema from "./adminUserSchema.js";

export const insertAdminUser = (adminUser) => {
  return adminUserSchema(adminUser).save();
};

export const updateAdminUser = (filter, update) => {
  return adminUserSchema.findOneAndUpdate(filter, update, {
    new: true,
  });
};

export const findOneAdminUser = (filter) => {
  return adminUserSchema.findOne(filter);
};
