import express from "express";
import {
  newPaymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  deletePaymentMethod,
  getPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethod,
} from "../model/payment-model/paymentMethodModal.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const paymentMethods = await getPaymentMethod();
    res.json({
      status: "success",
      message: "Payment Method List",
      data: paymentMethods,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    const paymentMethod = await insertPaymentMethod(req.body);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method Created",
        })
      : res.json({
          status: "error",
          message: "Payment Method Not Created",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 400;
      error.message = "Payment Method Already Exists";
    }
    next(error);
  }
});

// put
router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    const paymentMethod = await updatePaymentMethod(req.body);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method Updated",
        })
      : res.json({
          status: "error",
          message: "Payment Method Not Updated",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// delete
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const paymentMethod = await deletePaymentMethod(_id);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method Deleted",
        })
      : res.json({
          status: "error",
          message: "Payment Method Not Deleted",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
