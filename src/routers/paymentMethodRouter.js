import express from "express";
import {
  newPaymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/joi-validation/paymentMethodValidation.js";
import {
  deletePaymentMethodById,
  getPaymentMethod,
  insertNewPaymentMethod,
  updatePaymentMethodById,
} from "../model/payment-method/PaymentMethodModel.js";
const router = express.Router();

// get all payment method
router.get("/", async (req, res, next) => {
  try {
    const paymentMethod = await getPaymentMethod();

    res.json({
      status: "success",
      message: "payment method list",
      paymentMethod,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// add payment method
router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    const paymentMethod = await insertNewPaymentMethod(req.body);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add payment method",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This payment method has already been added to the list of payment methods, please edit the payment method list and try again later";

      error.status = 200;
    }
    next(error);
  }
});

// update payment method
router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    const paymentMethod = await updatePaymentMethodById(req.body);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update payment method",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// deletet payment method
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const paymentMethod = await deletePaymentMethodById(_id);

    paymentMethod?._id
      ? res.json({
          status: "success",
          message: "Payment Method deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete payment method",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
