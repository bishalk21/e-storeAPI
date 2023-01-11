import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
      index: 1,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment_Method", PaymentMethodSchema);
