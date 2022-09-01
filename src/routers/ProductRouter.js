import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middlewares/joi-validation/joiValidation.js";
import { addProduct, getProduct } from "../model/product/ProductModel.js";
import multer from "multer";

const router = express.Router();

// multer for image upload and validation
const fileUploadDest = "./public/images/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validate image type
    cb(error, fileUploadDest);
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "-" + file.originalname;
    cb(null, fullFileName);
  },
});

const upload = multer({ storage });
// get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await getProduct();
    res.json({
      status: "success",
      message: "to do",
      products,
    });
  } catch (error) {
    next(error);
  }
});

// get a product
router.post(
  "/",
  upload.array("images", 10),
  newProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.body);
      // slugify the product name
      // req.body.sluge = slugify(req.body.name, { lower: true, trim: true });
      const sluge = slugify(req.body.name, { lower: true, trim: true });
      // console.log(sluge);
      req.body.slug = sluge;
      const result = await addProduct(req.body);

      result?._id
        ? res.json({
            status: "success",
            message: "product added successfully",
          })
        : res.json({
            status: "error",
            message: "Unable to add product, Please try again",
          });
    } catch (error) {
      let message = error.message;
      if (message.includes("E11000 duplicate key error")) {
        error.message = "Product already exists";
      }
      next(error);
    }
  }
);

export default router;
