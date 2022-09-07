import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
  updateUserPasswordValidation,
  updateUserValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  userVerifiednotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
import {
  createJWTs,
  singAccessJWT,
  verifyRefreshJWT,
} from "../helpers/jwtHelper.js";
import { adminAuth } from "../middlewares/auth-middleware/authMiddleware.js";

router.get("/", adminAuth, (req, res, next) => {
  try {
    const user = req.adminInfo;
    user.password = undefined;
    user.refreshJWT = undefined;
    res.json({
      status: "success",
      message: "todo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "we have sent you an email to verify your account, Please chek your mail box including Junk folder",
      });

      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      //send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to create new admin user, try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user uses this email, ethier reset password or use different email.";
    }
    next(error);
  }
});

router.put("/", adminAuth, updateUserValidation, async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const result = await updateOneAdminUser({ _id }, rest);
    result?._id
      ? res.json({
          status: "success",
          message: "Admin user updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update admin user, try again later",
        });
  } catch (error) {
    next(error);
  }
});

// update password from profile page
router.patch(
  "/",
  adminAuth,
  updateUserPasswordValidation,
  async (req, res, next) => {
    try {
      const { _id, oldPassword, newPassword } = req.body;

      const userId = req.adminInfo._id.toString();

      if (_id !== userId) {
        return res.status(401).json({
          status: "error",
          message: "Invalid user",
        });
      }
      // check if old password is correct or if password is correct

      const passwdFromDb = req.adminInfo.password;

      const isMatch = comparePassword(oldPassword, passwdFromDb);
      //encrypt new password
      if (isMatch) {
        const hashedPassword = hashPassword(newPassword);

        // update password in db

        const result = await updateOneAdminUser(
          { _id },
          { password: hashedPassword }
        );
        result?._id
          ? res.json({
              status: "success",
              message: "Password updated successfully",
            })
          : res.json({
              status: "error",
              message: "Unable to update password, try again later",
            });
      }

      res.json({
        status: "success",
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { emailValidationCode, email } = req.body;

      const user = await updateOneAdminUser(
        {
          emailValidationCode,
          email,
        },
        {
          status: "active",
          emailValidationCode: "",
        }
      );

      user?._id
        ? res.json({
            status: "success",
            message: "You account has been verified, you may login in now.",
          }) && userVerifiednotification(user)
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was takne.",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;

    // find if user exist based on give email

    const user = await findOneAdminUser({ email });

    if (user?._id) {
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account has not been verified, Pelase check your emai and verify your account.",
        });
      }

      // we need to verify if the password send by the user and the hased password stored in our db is the same

      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;

        //jwt
        const jwts = await createJWTs({ email });

        return res.json({
          status: "success",
          message: "Logged in successfully",
          user,
          ...jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credintials.",
    });
  } catch (error) {
    next(error);
  }
});

// generat new accessJWT send back to the client
router.get("/accessjwt", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      //verify the token
      const decoded = verifyRefreshJWT(authorization);

      if (decoded.email) {
        //check if exist in db
        const user = await findOneAdminUser({ email: decoded.email });
        if (user?._id) {
          //create new accessjwt and return

          return res.json({
            status: "success",
            accessJWT: await singAccessJWT({ email: decoded.email }),
          });
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Unauthenticated",
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

export default router;
