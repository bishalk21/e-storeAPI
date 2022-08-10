import adminUserSchema from "./adminUserSchema.js";

export const insertAdminUser = (adminUser) => {
    return adminUserSchema(adminUser).save();
}