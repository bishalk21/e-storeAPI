import SessionSchema from "./SessionSchema.js";

// add token to session
export const insertSession = (obj) => {
  return SessionSchema(obj).save();
};

// get session
// filter/obj must be object
export const getSession = (obj) => {
  return SessionSchema.findOne(obj);
};

// delete session
export const deleteSession = (obj) => {
  return SessionSchema.findOneAndDelete(obj);
};
