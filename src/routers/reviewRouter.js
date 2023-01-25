import express from "express";
const router = express.Router();

// what database should have:
const reviewArgs = [
  {
    _id: "dsfgfgs23456dff",
    review: "message here",
    productId: "dsfsdz23gfgsdff",
    productName: "Mac",
    ratings: 5,
    reviewedBy: "Bishal",
    reviewedById: "dsfgfg2s3425d221ff",
  },
  {
    _id: "dsfgfgs2rg33456dff",
    review: "message here",
    productId: "dsfsdz23gfgsdff",
    productName: "Mac",
    ratings: 5,
    reviewedBy: "Bishal",
    reviewedById: "dsfgfg2s3425d221ff",
  },
  {
    _id: "dsfgfgs2sf35tv3456dff",
    review: "message here",
    productId: "dsfsdz23gfgsdff",
    productName: "Mac",
    ratings: 5,
    reviewedBy: "Bishal",
    reviewedById: "dsfgfg2s3425d221ff",
  },
];

// get all reviews
router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;

    const reviews = _id
      ? reviewArgs.filter((item) => item._id === _id)[0]
      : reviewArgs;

    res.json({
      status: "success",
      message: "Order List",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
