import express from "express";
import "dotenv/config";
import {
  getAllCategories,
  getCategoryById,
  insertCategory,
} from "../model/category/categoryModel.js";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";

const router = express.Router();

import slugify from "slugify";

// get all categories
router.get("/:_id?", async (req, res, next) => {
  // :_id? is for checking if the id is present or not
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();

    res.json({
      status: "success",
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// insert new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name, { lower: true, trim: true }); //
    const result = await insertCategory(req.body);
    // console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Category Created Successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create category, please try again",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
