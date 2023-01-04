import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import { emailVerificationValidation, newAdminUserValidation } from "../middlewares/joi-validation/AdminUserValidation.js";
import { addNewUser, findOneUser, updateOneUser } from "../model/admin-user/adminUserModel.js";
import {  v4 as uuidv4 } from 'uuid';
import { userVerifyNotification, verificationEmail } from "../helpers/emailHelper.js";
import { signAccessJWT } from "../helpers/jwtHelper.js";
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
                message: "User created, Please check your email to verify your account!",
                user
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

        const user = await updateOneUser({
            emailValidateCode,
            email,
        },{
            status: "active",
            emailValidateCode: "",
        })
        // console.log(user);

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

// login user
router.post("/login", async (req,res,next)=> {
    try {
        // console.log(req.body);
        const { password, email} = req.body;

        // find if user exists on given email
        const user = await findOneUser({email})

        // if user exists 
        if (user?._id){
            
        // status is not active
        if (user?.status !== "active"){
            res.json({
                status: "error",
                message: "Your account is not verified, please check your email to verify your account"
            })
        }

        // we need to verify if the password send by user and the hashed password stored in db is same
        const isPasswordMatch = comparePassword(password, user.password)

        // if password is matched
        if (isPasswordMatch){

            // not sending password
            user.password = undefined;

            // before login success, we need to have jwt
            const jwts = await signAccessJWT({email});

            return res.json({
                status: "success",
                message: "Login successful",
                user,
                jwts
            })
        }
        }
    // if user not found or password not matched
      res.json({
            status: "error",
            message: "Invalid email or password"
        })

    } catch (error) {
        next(error);
    }
})

export default router;