import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { emailVerificationValidation, newAdminUserValidation } from "../middlewares/joi-validation/AdminUserValidation.js";
import { addNewUser, updateOneUser } from "../model/admin-user/adminUserModel.js";
import {  v4 as uuidv4 } from 'uuid';
import { userVerifyNotification, verificationEmail } from "../helpers/emailHelper.js";
const router = express.Router();

// create new user
router.post("/",newAdminUserValidation,async (req,res,next)=> {
    try {
        // console.log(req.body);
        const {password} = req.body;
        // console.log(password);
        // console.time("timer")

        // email validation
        req.body.emailValidateCode = uuidv4();

        req.body.password = hashPassword(password);
        // console.log(hasPass);
        const user = await addNewUser(req.body)
        // console.timeEnd("timer")

        if (user?._id){
            // send email
            res.json({
                status: "success",
                message: "User created, Please check your email to verify your account!"
            })

        // sending link to user
        const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidateCode}&e=${user.email}`

        verificationEmail({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            url
        })

            return;
        }
            res.json({
                status: "error",
                message: "Unable to create user, please try again later"
            })

    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection:")){
            error.status = 200; 
            error.message = "There is already another user exist in this email, either reset password or use different email";
        }
        next(error);
    }
})

// verify user
router.patch("/verify-email",emailVerificationValidation, async (req,res,next)=> {
    try {
        // console.log(req.body);
        const {emailValidateCode, email} = req.body;

        const result = await updateOneUser({
            emailValidateCode,
            email
        },{
            status: "active",
            emailValidateCode: ""
        })

        user?._id ?
        res.json({
            status: "success",
            message: "Your account has been verified, please login to continue"
        }) && userVerifyNotification(user)
         : res.json({
            status: "error",
            message: "Unable to verify your account, please try again later"
        })

    } catch (error) {
        next(error);
    }
})

export default router;