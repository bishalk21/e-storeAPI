import PaymentMethodSchema from "./PaymentMethodSchema.js";

// adding payment method
export const insertNewPaymentMethod = (obj) => {
  return PaymentMethodSchema(obj).save();
};

// get payment method
export const getPaymentMethod = () => {
  return PaymentMethodSchema.find();
};

// update payment method by id
export const updatePaymentMethodById = ({ _id, ...update }) => {
  return PaymentMethodSchema.findByIdAndUpdate(_id, update);
};

// delete payment method by id
export const deletePaymentMethodById = (_id) => {
  return PaymentMethodSchema.findByIdAndDelete(_id);
};
