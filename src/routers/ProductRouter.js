import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middlewares/joi-validation/joiValidation.js";
import {
  addProduct,
  deleteProductById,
  getProduct,
  getProductById,
} from "../model/product/ProductModel.js";
import multer from "multer";
import fs from "fs";

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
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const products = _id ? await getProductById(_id) : await getProduct();
    // const products = await getProduct();
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
      const files = req.files;
      // console.log(files);
      if (files.length) {
        const images = files.map((images) => images.path.slice(6));
        console.log(images);

        req.body.images = images;
        req.body.thumbnail = images[0];
      }

      // console.log(req.body);
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

// delete a product
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const imgToDelete = req.body;
    // delete product from disk not recommended to use
    if (imgToDelete.length) {
      imgToDelete.map((item) => {
        item && fs.unlinkSync("./public/" + item);
      });
    }
    // delete product from database bassed on id
    const product = await deleteProductById(_id);
    product?._id
      ? res.json({
          status: "success",
          message: "product deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete product, Please try again",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
