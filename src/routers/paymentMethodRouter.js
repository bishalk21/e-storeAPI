import express from "express";
import {
  newPaymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  deletePaymentMethodById,
  getPaymentMethods,
  insertPaymentMethod,
  updatePaymentMethodById,
} from "../models/payment-method/PaymentMethodModel.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pm = await getPaymentMethods();
    res.json({
      status: "success",
      message: "todo",
      pm,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    const pm = await insertPaymentMethod(req.body);

    pm?._id
      ? res.json({
          status: "success",
          message: "The new payment method has been added.",
        })
      : res.json({
          status: "error",
          message:
            "Error, unable to add new payment method, please try again later.",
        });
  } catch (error) {
    error.status = 500;

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This payment method has been already added, edit them instead.";
      error.status = 200;
    }

    next(error);
  }
});

router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    const pm = await updatePaymentMethodById(req.body);

    pm?._id
      ? res.json({
          status: "success",
          message: "The  payment method has been updated.",
        })
      : res.json({
          status: "error",
          message:
            "Error, unable to update the payment method, please try again later.",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const pm = await deletePaymentMethodById(_id);

    pm?._id
      ? res.json({
          status: "success",
          message: "The  payment method has been DELETED.",
        })
      : res.json({
          status: "error",
          message:
            "Error, unable to DELETE the payment method, please try again later.",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
