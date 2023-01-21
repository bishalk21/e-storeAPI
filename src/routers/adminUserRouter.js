import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  newAdminUserValidation,
  updateAdminUserPasswordValidation,
  updateAdminUserValidation,
} from "../middlewares/joi-validation/AdminUserValidation.js";
import {
  addNewUser,
  findOneUser,
  updateOneUser,
} from "../model/admin-user/adminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  otpNotification,
  userVerifyNotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
import {
  createJWTs,
  signAccessJWT,
  verifyRefreshJWT,
} from "../helpers/jwtHelper.js";
import { authAdmin } from "../middlewares/auth-middleware/authMiddleware.js";
import { createOTP } from "../../randomGenerator.js";
import { insertSession } from "../model/browser-sesion/SessionModel.js";
const router = express.Router();

// fetch user
router.get("/", authAdmin, (req, res, next) => {
  try {
    const user = req.adminInfo;
    user.password = undefined;
    user.refreshJWT = undefined;

    res.json({
      status: "success",
      message: "User fetched",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// create new user
router.post("/", authAdmin, newAdminUserValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    const { password } = req.body;
    // console.log(password);
    // console.time("timer")

    // email validation
    req.body.emailValidateCode = uuidv4();

    req.body.password = hashPassword(password);
    // console.log(hasPass);
    const user = await addNewUser(req.body);
    // console.timeEnd("timer")

    if (user?._id) {
      // send email
      res.json({
        status: "success",
        message:
          "User created, Please check your email to verify your account!",
        user,
      });

      // sending link to user
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidateCode}&e=${user.email}`;

      verificationEmail({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        url,
      });

      return;
    }
    res.json({
      status: "error",
      message: "Unable to create user, please try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection:")) {
      error.status = 200;
      error.message =
        "There is already another user exist in this email, either reset password or use different email";
    }
    next(error);
  }
});

// verify user
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      // console.log(req.body);
      const { emailValidateCode, email } = req.body;

      const user = await updateOneUser(
        {
          emailValidateCode,
          email,
        },
        {
          status: "active",
          emailValidateCode: "",
        }
      );
      // console.log(user);

      user?._id
        ? res.json({
            status: "success",
            message: "Your account has been verified, please login to continue",
          }) && userVerifyNotification(user)
        : res.json({
            status: "error",
            message: "Unable to verify your account, please try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

// login user
router.post("/login", async (req, res, next) => {
  try {
    // console.log(req.body);
    const { password, email } = req.body;

    // find if user exists on given email
    const user = await findOneUser({ email });

    // if user exists
    if (user?._id) {
      // status is not active
      if (user?.status !== "active") {
        res.json({
          status: "error",
          message:
            "Your account is not verified, please check your email to verify your account",
        });
      }

      // we need to verify if the password send by user and the hashed password stored in db is same
      const isPasswordMatch = comparePassword(password, user.password);

      // if password is matched
      if (isPasswordMatch) {
        // not sending password
        user.password = undefined;

        // before login success, we need to have jwt
        const jwts = await createJWTs({ email });

        return res.json({
          status: "success",
          message: "Login successful",
          user,
          ...jwts,
        });
      }
    }
    // if user not found or password not matched
    res.json({
      status: "error",
      message: "Invalid email or password",
    });
  } catch (error) {
    next(error);
  }
});

// generate new accessJWT and send back to client
router.get("/accessjwt", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);

    if (authorization) {
      // 1. verify the token
      const decoded = await verifyRefreshJWT(authorization);
      //   console.log(decoded);÷frodf

      // 2. check if exist in db
      if (decoded.email) {
        const user = await findOneUser({ email: decoded.email });
        // 3. create new accessJWT and return
        if (user?._id) {
          //   const accessJWT = await signAccessJWT({ email: decoded.email });
          return res.json({
            status: "success",
            message: "Access token generated",
            accessJWT: await signAccessJWT({ email: decoded.email }),
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

// updating user profile router
router.put(
  "/",
  authAdmin,
  updateAdminUserValidation,
  async (req, res, next) => {
    try {
      // console.log(req.body);
      const { _id, ...rest } = req.body;

      const result = await updateOneUser({ _id }, rest);

      result?._id
        ? res.json({
            status: "success",
            message: "User profile updated successfully",
          })
        : res.json({
            status: "error",
            message:
              "An error has occurred while updating the user profile, please try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

// update admin user password in user profile page
router.patch(
  "/",
  authAdmin,
  updateAdminUserPasswordValidation,
  async (req, res, next) => {
    try {
      // console.log(req.body);
      const { password, _id, newPassword } = req.body;

      // user admin info from admin auth
      // console.log(req.adminInfo);
      // converting into string
      const userId = req.adminInfo._id.toString();
      if (_id !== userId) {
        return res.status(401).json({
          status: "error",
          message: "Invalid user request",
        });
      }

      // 1. check if password is valid
      const passwordFromDB = req.adminInfo.password;
      const isPasswordMatched = comparePassword(password, passwordFromDB);

      if (isPasswordMatched) {
        // 2. encrypt the new password
        const hashedPassword = hashPassword(newPassword);

        // 3. update the password in db

        const result = await updateOneUser(
          { _id },
          { password: hashedPassword }
        );

        if (result?._id) {
          return res.json({
            status: "success",
            message: "Password has been updated successfully",
          });
        }
      }

      res.json({
        status: "error",
        message: "Unable to update password, please try again later",
      });
    } catch (error) {
      next(error);
    }
  }
);

// password reset as logged out admin
router.post("/req-password-reset-otp", async (req, res, next) => {
  try {
    // console.log(req.body);

    // 1. check if user exist
    const { email } = req.body;

    if (email.includes("@")) {
      const user = await findOneUser({ email });

      if (user?._id) {
        // 2. create unique code and
        // const otp = createOTP();

        // 3. store otp in db with email
        const obj = {
          token: createOTP(),
          associate: email,
          type: "updatePassword",
        };

        const result = await insertSession(obj);
        // console.log(result);

        if (result?._id) {
          // 3. email unique link for the frontend that takes user to password update page
          otpNotification({
            otp: result.token,
            fName: result.associate,
            email,
          });
        }
      }
    }

    res.json({
      status: "success",
      message:
        "If the email exist in our system, we will send you OTP and password reset link in your email",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
