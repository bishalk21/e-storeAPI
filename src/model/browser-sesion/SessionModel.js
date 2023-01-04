import SessionSchema from "./SessionSchema.js";

// add token to session
export const insertSession = (obj) => {
    return SessionSchema(obj).save();
}
