import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middlewares/joi-validation/productValidation.js";
import { addProducts, getAllProducts } from "../model/product/ProductModel.js";

const router = express.Router();

// get products
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.json({
      status: "success",
      message: "Product List",
      products,
    });
  } catch (error) {
    next(error);
  }
});

// post products
router.post("/", newProductValidation, async (req, res, next) => {
  try {
    // console.log(req.body);

    req.body.slug = slugify(req.body.name, { lower: true, trim: true });

    const result = await addProducts(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Product created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create product",
        });
  } catch (error) {
    // error.status = 401;
    // next(error);
    let message = error.message;
    if (message.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is already another product with the same name. Please change the product name and resubmit again!";
    }
    next(error);
  }
});

export default router;
