import express from "express";
import "dotenv/config";
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  hasChildCategoryById,
  insertCategory,
  updateCategoryById,
} from "../model/category/categoryModel.js";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joi-validation/joiValidation.js";

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

// update category
router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    const hasChildCategory = await hasChildCategoryById(req.body._id);
    if (hasChildCategory) {
      return res.json({
        status: "error",
        message:
          "Cannot update category with child category, please delete or re-assign child category to another category before updating",
      });
    }
    const catUpdate = await updateCategoryById(req.body);
    catUpdate?._id
      ? res.json({
          status: "success",
          message: "Category Updated Successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update category, please try again",
        });
  } catch (error) {
    next(error);
  }
});

// delete category
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const hasChildCategory = await hasChildCategoryById(_id);
    if (hasChildCategory) {
      return res.json({
        status: "error",
        message:
          "Cannot delete category with child category, please delete or re-assign child category to another category before deleting",
      });
    }
    const catDelete = await deleteCategoryById(_id);
    catDelete?._id
      ? res.json({
          status: "success",
          message: "Category Deleted Successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete category, please try again",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
