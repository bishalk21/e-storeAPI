import express from "express";
import slugify from "slugify";
import {
  newProductValidation,
  updateProductValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../models/product/ProductModel.js";
const router = express.Router();
import multer from "multer";
import fs from "fs";

//setup multer for validaton and upload destination
const filUploadDestination = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation test if needed....

    cb(error, filUploadDestination);
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "-" + file.originalname;
    cb(null, fullFileName);
  },
});

const upload = multer({ storage });

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const products = _id ? await getProductById(_id) : await getAllProducts();

    res.json({
      status: "success",
      message: "todo get method",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      const files = req.files;

      if (files.length) {
        const images = files.map((img) => img.path.slice(6));
        console.log(images);

        req.body.images = images;
        req.body.thumbnail = images[0];
      }

      const sluge = slugify(req.body.name, { lower: true, trim: true });
      console.log(sluge);
      req.body.slug = sluge;
      const result = await addProduct(req.body);

      result?._id
        ? res.json({
            status: "success",
            message: "New Product has been added",
          })
        : res.json({
            status: "error",
            message: "Unable to add the product, Please try again later",
          });
    } catch (error) {
      let message = error.message;

      if (message.includes("E11000 duplicate key error collection")) {
        error.message =
          "There is already another product with the same name and sluge or SKU. Chang the product details and resubmit again";
      }

      next(error);
    }
  }
);

// update
router.put(
  "/:_id",
  upload.array("newImages", 5),
  updateProductValidation,
  async (req, res, next) => {
    try {
      const { body, files } = req;
      let { images, imgToDel } = body;
      images = images.split(",");
      imgToDel = imgToDel.split(",");
      const imgAfterFilter = images.filter((img) => !imgToDel.includes(img));

      if (files) {
        const newImages = files.map((img) => img.path.slice(6));
        images = [...images, ...newImages];
      }

      const product = await updateProductById(body);

      product?._id
        ? res.json({
            status: "success",
            message: "Product has been updated",
          })
        : res.json({
            status: "error",
            message: "Unable to update the product, Please try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const imgToDelete = req.body;
    // deleteing img from disk, not recommended in the production
    if (imgToDelete.length) {
      imgToDelete.map((item) => item && fs.unlinkSync("./public/" + item));
    }

    // delete the product form the databse based on the given _id

    const product = await deleteProductById(_id);

    product?._id
      ? res.json({
          status: "success",
          message: "The product has been deleted successfully",
        })
      : res.json({
          status: "error",
          message:
            "Error, Unable to delete the product, Please try again later.",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
