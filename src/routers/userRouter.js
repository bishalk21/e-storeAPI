import express from "express";
const router = express.Router();

// what database should have:
const userArgs = [
  {
    _id: "dsfg3456dff",
    firstName: "Bishal",
    lastName: "Karki",
    phone: "123",
    email: "bishal@gmail.com",
  },
  {
    _id: "dsf56dff",
    firstName: "Bishal",
    lastName: "Karki",
    phone: "123",
    email: "bishal@gmail.com",
  },
  {
    _id: "dsfgfg6dff",
    firstName: "Bishal",
    lastName: "Karki",
    phone: "123",
    email: "bishal@gmail.com",
  },
];

// get all users
router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;

    const users = _id
      ? userArgs.filter((item) => item._id === _id)[0]
      : userArgs;

    res.json({
      status: "success",
      message: "user List",
      users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
