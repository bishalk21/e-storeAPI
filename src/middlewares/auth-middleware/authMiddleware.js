import { verifyAccessJWT } from "../../helpers/jwtHelper.js";
import { getSession } from "../../model/browser-sesion/SessionModel.js";
import { findOneUser } from "../../model/admin-user/adminUserModel.js";

export const authAdmin = async (req, res, next) => {
  try {
    // testing
    // const isVerified = false;

    // if (!isVerified) {
    //   return next();
    // }

    // res.status(401).json({
    //   status: "error",
    //   message: "Unauthorized",
    // });
    // testing–end

    //
    // 1. receive accessJWT as a authorization header
    const { authorization } = req.headers;
    console.log(authorization);

    // 2. verify if accessJWT is valid
    if (authorization) {
      const decoded = await verifyAccessJWT(authorization);

      // if jwt expired
      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired",
        });
      }

      // 3. if accessJWT is valid, check if the user is in the session table
      if (decoded?.email) {
        const existInDB = await getSession({
          type: "jwt",
          token: authorization,
        });

        // 4. then, get the user info by email which is available through the jwt decode
        if (existInDB?._id) {
          const adminInfo = await findOneUser({ email: decoded.email });

          // 5. if the user is in the session table, then attach the user info to the request object
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;

            // 6. then, call next() to continue the requests
            return next();
          }
        }
      }
    }

    // 7. if any of the steps fail above, return unauthorization error message.
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
