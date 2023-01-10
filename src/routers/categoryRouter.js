import express from "express";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joi-validation/categoryValidation.js";
import {
  addCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  hasChildCategory,
  updateCategoryById,
} from "../model/category/categoryModel.js";
const router = express.Router();
import slugify from "slugify";

// get all category
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategory();

    res.json({
      status: "success",
      message: "category list",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// add category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);

    // slugify to category
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });

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

// update category
router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);

    const hasChildCats = await hasChildCategory(req.body._id);

    if (hasChildCats) {
      return res.json({
        status: "error",
        message:
          "Unable to update category, please remove child categories or reassign the child categories to other category before taking any action",
      });
    }

    const categoryUpdate = await updateCategoryById(req.body);

    categoryUpdate?._id
      ? res.json({
          status: "success",
          message: "Category updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update category",
        });
  } catch (error) {
    next(error);
  }
});

// delete category
router.delete("/:_id", async (req, res, next) => {
  try {
    // console.log(req.params);

    const { _id } = req.params;

    const hasChildCats = await hasChildCategory(_id);

    if (hasChildCats) {
      return res.json({
        status: "error",
        message:
          "Sorry, cannot delete the category having child category, please delete or re-assign the child category to other category before taking any action",
      });
    }

    const categoryDelete = await deleteCategoryById(_id);

    categoryDelete?._id
      ? res.json({
          status: "success",
          message: "Category deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete category",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
