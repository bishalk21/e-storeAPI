import express from "express";

const router = express.Router();

const userArgs = [
  {
    _id: "1",
    fName: "Bishal",
    lName: "Karki",
    email: "sdfn@e.co",
    phone: "123456789",
    password: "123456",
  },
  {
    _id: "1",
    fName: "Bishal",
    lName: "Karki",
    email: "sdfn@e.co",
    phone: "123456789",
    password: "123456",
  },
  {
    _id: "1",
    fName: "Bishal",
    lName: "Karki",
    email: "sdfn@e.co",
    phone: "123456789",
    password: "123456",
  },
  {
    _id: "1",
    fName: "Bishal",
    lName: "Karki",
    email: "sdfn@e.co",
    phone: "123456789",
    password: "123456",
  },
  {
    _id: "1",
    fName: "Bishal",
    lName: "Karki",
    email: "sdfn@e.co",
    phone: "123456789",
    password: "123456",
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;
    const users = _id
      ? userArgs.filter((item) => item._id == _id)[0]
      : userArgs;
    res.json({
      status: "success",
      message: "Welcome to the API",
      users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
