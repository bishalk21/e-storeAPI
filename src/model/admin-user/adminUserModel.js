import AdminUserSchema from "./adminUserSchema.js";

// insert new user
 export const addNewUser =(user) => {
    return AdminUserSchema(user).save();
 }

 // update user 
 export const updateOneUser = (filter, update) => {
      return AdminUserSchema.findOneAndUpdate(filter, update, {new: true});
 }