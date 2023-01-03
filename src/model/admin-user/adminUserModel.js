import AdminUserSchema from "./adminUserSchema.js";

// insert new user
 export const addNewUser =(user) => {
    return AdminUserSchema(user).save();
 }