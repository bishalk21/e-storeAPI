import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { addNewUser } from "../model/admin-user/adminUserModel.js";
const router = express.Router();

// create new user
router.post("/",async (req,res,next)=> {
    try {
        // console.log(req.body);
        const {password} = req.body;
        // console.log(password);

        const hasPass = hashPassword(password);
        // console.log(hasPass);
        const user = await addNewUser(req.body)

        user?._id ? (
            res.json({
                status: "success",
                message: "User created, Please check your email to verify your account!"
            })
        ) : (
            res.json({
                status: "error",
                message: "Unable to create user, please try again later"
            })
        )

    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection:")){
            error.status = 200; 
            error.message = "There is already another user exist in this email, either reset password or use different email";
        }
        next(error);
    }
})

// verify user
router.patch("/verify-email", (req,res,next)=> {
    try {
        console.log(req.body);

        res.json({
            status: "success",
            message: "User verified"
        })

    } catch (error) {
        next(error);
    }
})

export default router;