import express from "express";

const router = express.Router();

const reviewArgs = [
  {
    _id: "1",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },
  {
    _id: "123",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },
  {
    _id: "1123",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },
  {
    _id: "11234",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },
  {
    _id: "1234",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },

  {
    _id: "1235",
    review: "This is a review",
    productID: "1",
    productName: "product 1",
    rating: 5,
    reviewedByID: "1",
    reviewedBy: "Bishal Karki",
    reviewedOn: "2021-08-01",
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;
    const reviews = _id
      ? reviewArgs.filter((item) => item._id == _id)[0]
      : reviewArgs;
    res.json({
      status: "success",
      message: "Welcome to the API",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
