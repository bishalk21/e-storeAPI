import { verifyAccessJWT } from "../../helpers/jwtHelper.js";
import { findOneAdminUser } from "../../models/adminUser/AdminUserModel.js";
import { getSession } from "../../models/session/SessionModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const decoded = await verifyAccessJWT(authorization);

      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired",
        });
      }

      if (decoded?.email) {
        const existInDb = await getSession({
          type: "jwt",
          token: authorization,
        });

        if (existInDb?._id) {
          const adminInfo = await findOneAdminUser({ email: decoded.email });
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;
            return next();
          }
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "unauthorize",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
