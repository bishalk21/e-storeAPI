import jwt from "jsonwebtoken";
import {
  updateAdminUser
} from "../model/adminUserModel /adminUserModel.js";
import {
  deleteSession,
  insertSession
} from "../model/session/SessionTable.js";

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

  await updateAdminUser(payload, {
    refreshJWT,
  });
  return refreshJWT;
};

export const createJWTs = async (payload) => {
  return {
    accessJWT: await signAccessJWT(payload), // receive accessJWT from signAccessJWT

    refreshJWT: await signRefreshJWT(payload), // receive refreshJWT from signRefreshJWT
  };
};

export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch ({
    message
  }) {
    if (message === "jwt expired") {
      // delete expired jwt from session table
      deleteSession({
        type: "jwt",
        token
      })
    }
    return message;
  }
}

export const verifyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}