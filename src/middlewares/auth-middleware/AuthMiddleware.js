import { verifyJWT } from "../../helpers/jwtHelper.js";
import { findOneAdminUser } from "../../model/adminUserModel /adminUserModel.js";
import { getSession } from "../../model/session/SessionTable.js";

const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const decoded = await verifyJWT(authorization);

      if (decoded === "jwt expired") {
        return res.status(401).json({
          status: "error",
          message: "JWT expired",
        });
      }

      if (decoded?.email) {
        const existInDb = await getSession({
          type: "jwt",
          token: authorization,
        });

        if (existInDb?._id) {
          const adminInfo = await findOneAdminUser({
            email: decoded.email,
          });
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;
            return next();
          }
        }
      }
    }

    // const isVerified = true;
    // if (isVerified) {
    //   return next();
    // }
    res.status(401).json({
      status: "error",
      message: "Unauthorized Access",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export default adminAuth;
