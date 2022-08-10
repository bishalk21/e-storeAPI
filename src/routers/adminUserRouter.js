import express from "express";

const router = express.Router();
router.post("/", (req, res, next) => {
    try {
        console.log(req.body);
        res.json({
            status: "success",
            message: "Admin User Created Successfully"
        })
    } catch (error) {
        next(error);
    }
})

router.patch("/verify-email", (req, res, next) => {
    try {
        console.log(req.body);
        res.json({
            status: "success",
            message: "Admin User Verified Successfully"
        })
    } catch (error) {
        next(error);
    }
})

export default router;