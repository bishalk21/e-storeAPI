import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { insertAdminUser } from "../model/adminUserModel /adminUserModel.js";
// server side validation
// encrypt password
// insert into database
// create unique token verification link
// send email with verification link to our frontend client with the email and verification token to verify the email
const router = express.Router();
router.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;
    // console.log(req.body);
    // console.time("encryptPassword");
    // const hashedPass = hashPassword(password);
    // req.body.password = hashPassword(password);

    // console.log(hashedPass);
    // console.timeEnd("encryptPassword");

    const user = await insertAdminUser(req.body);
    console.log(user);
    user?._id
      ? res.json({
          status: "success",
          message:
            "Admin User Created Successfully! We have sent an email to the user with the password. Please check your email including spam folder.",
        })
      : res.json({
          status: "fail",
          message: "Admin User Creation Failed",
        });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      res.status(400).json({
        status: "fail",
        message: "Admin User Already Exists",
      });
    }
    next(error);
  }
});

router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "Admin User Verified Successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
