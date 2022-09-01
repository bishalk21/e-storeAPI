import { verifyJWT } from "../../helpers/jwtHelper.js";
import { findOneAdminUser } from "../../model/adminUserModel /adminUserModel.js";
import { getSession } from "../../model/session/SessionTable.js";

const adminAuth = async (req, res, next) => {
  try {
    //receive the jwt as a authorized
    const { authorization } = req.headers;
    if (authorization) {
      const decoded = await verifyJWT(authorization);

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

        console.log(authorization, decoded, existInDb);

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
      message: "Unauthorized",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export default adminAuth;
