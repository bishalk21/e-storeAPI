import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/categoryValidation.js";
import { addCategory } from "../model/category/categoryModel.js";
const router = express.Router();

// add category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);

    const result = await addCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Category added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
