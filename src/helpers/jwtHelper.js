import jwt from "jsonwebtoken";
import { updateOneAdminUser } from "../models/adminUser/AdminUserModel.js";
import {
  deleteSession,
  insertSession,
} from "../models/session/SessionModel.js";

export const singAccessJWT = async (payload) => {
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

export const singRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};

export const createJWTs = async (payload) => {
  return {
    accessJWT: await singAccessJWT(payload),
    refreshJWT: await singRefreshJWT(payload),
  };
};

export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch ({ message }) {
    if (message === "jwt expired") {
      //delete jwt from session table
      deleteSession({
        type: "jwt",
        token,
      });
    }
    return message;
  }
};

export const verifyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
