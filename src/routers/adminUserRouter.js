import express from "express";
import { v4 as uuidv4 } from "uuid";

import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  userVerifiedNotification,
  verifyEmail,
} from "../helpers/emailHelper.js";
import { createJWTs } from "../helpers/jwtHelper.js";

import {
  loginValidation,
  newAdminUserValidation,
  verifyAdminUserValidation,
} from "../middlewares/joi-validation/adminUserValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateAdminUser,
} from "../model/adminUserModel /adminUserModel.js";
// server side validation
// encrypt password
// insert into database
// create unique token verification link
// send email with verification link to our frontend client with the email and verification token to verify the email
const router = express.Router();
router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    // console.log(req.body);
    // console.time("encryptPassword");
    // const hashedPass = hashPassword(password);
    req.body.password = hashPassword(password);

    // console.log(hashedPass);
    // console.timeEnd("encryptPassword");
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    console.log(user);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "Admin User Created Successfully! We have sent an email to the user with the password. Please check your email including spam folder.",
      });
      // http://localhost/3000/api/v1/admin-user/verify-email?e=ac@g.com&c=019b8c57-f1c6-43e6-8469-10f57fb2bafb
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      verifyEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });

      return;
    }

    res.json({
      status: "error",
      message: "Admin User Creation Failed",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Email already exists";
    }
    next(error);
  }
});

router.patch(
  "/verify-email",
  verifyAdminUserValidation,
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, emailValidationCode } = req.body;
      const user = await updateAdminUser(
        {
          email,
          emailValidationCode,
        },
        {
          status: "active",
          emailValidationCode: "",
        }
      );

      console.log(user);

      user?._id
        ? res.json({
            status: "success",
            message: "Admin User Verified Successfully",
          }) && userVerifiedNotification(user)
        : res.json({
            status: "error",
            message:
              "invalid email or email validation code, but no action taken",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findOneAdminUser({
      email,
    });
    console.log(user);

    if (user?._id) {
      // we need to verify if the password sent by user and hashed password in database matches
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account is not verified, Please check your email and verify your account",
        });
      }
      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        user.password = undefined;

        //jwt token
        const jwts = await createJWTs({
          email,
        });
        return res.json({
          status: "success",
          message: "Login Successful",
          user,
          ...jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid email or password, but no action taken",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
