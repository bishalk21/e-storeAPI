import jwt from "jsonwebtoken";
import { updateOneUser } from "../model/admin-user/adminUserModel.js";
import {
  deleteSession,
  insertSession,
} from "../model/browser-sesion/SessionModel.js";

export const signAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const obj = {
    token: accessJWT,
    type: "jwt",
  };

  await insertSession(obj);
  return accessJWT;
};

export const signRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateOneUser(payload, { refreshJWT });
  return refreshJWT;
};

export const createJWTs = async (payload) => {
  const accessJWT = await signAccessJWT(payload);
  const refreshJWT = await signRefreshJWT(payload);
  return { accessJWT, refreshJWT };
};

export const verifyAccessJWT = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch ({ message }) {
    if (message === "jwt expired!") {
      // delete the jwt from session table
      await deleteSession({
        type: "jwt",
        token,
      });
    }
    return message;
  }
};

export const verifyRefreshJWT = async (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
