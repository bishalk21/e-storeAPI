import express from "express";
import slugify from "slugify";
import {
  newProductValidation,
  updateProductValidation,
} from "../middlewares/joi-validation/productValidation.js";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getSingleProductById,
  updateProductById,
} from "../model/product/ProductModel.js";
import multer from "multer";
const router = express.Router();
import fs from "fs";

// setup multer for validation and upload destination
const fileUploadDestination = "public/img/products";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation test if needed ....
    cb(error, fileUploadDestination);
  },
  filename: (req, file, cb) => {
    const fullFilename = Date.now() + "-" + file.originalname;

    cb(null, fullFilename);
  },
});

// upload destination
const upload = multer({ storage });

// get products
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id
      ? await getSingleProductById(_id)
      : await getAllProducts();

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
router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      // console.log(req.body);

      const files = req.files;
      // console.log(files);

      // images
      if (files.length) {
        // path images manage
        const images = files.map((image) => image.path.slice(6));
        // console.log(images);

        req.body.images = images;

        // thumnbnail
        req.body.thumbnail = images[0];
      }

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
  }
);

// update product
router.put(
  "/",
  upload.array("newImages", 5),
  updateProductValidation,
  async (req, res, next) => {
    try {
      // console.log(req.body, req.files);
      const { body, files } = req;

      //recieve new images and image to delete
      // convert image into array
      let { images, imgToDelete } = body;
      images = images.split(",");
      imgToDelete = imgToDelete.split(",");
      // console.log(images, "=============");
      // console.log(imgToDelete);

      images = images.filter((img) => !imgToDelete.includes(img));
      // console.log(imgAfterFilter);

      if (files) {
        const newImages = files.map((imgObj) => imgObj.path.slice(6));
        images = [...images, ...newImages];
      }
      body.images = images;

      const product = await updateProductById(body);

      product?._id
        ? res.json({
            status: "success",
            message: "Product updated successfully",
          })
        : res.json({
            status: "error",
            message: "Unable to update product, please try again later",
          });
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

// delete product
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const imgToDelete = req.body;

    // deleting item from disk, not reccomended in production
    if (imgToDelete.length) {
      // fs.unlinkSync("PATH TO IMAGE")
      imgToDelete.map((item) => item && fs.unlinkSync("./public/" + item));
    }

    // delete the product from database based on given _id
    const product = await deleteProduct(_id);

    product?._id
      ? res.json({
          status: "success",
          message: "Product deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Product not found",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
