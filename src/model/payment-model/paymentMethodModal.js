import paymentMethodSchema from "./paymentMethodSchema.js";

export const insertPaymentMethod = (obj) => {
  return paymentMethodSchema(obj).save();
};

// get
export const getPaymentMethod = () => {
  return paymentMethodSchema.find();
};

//update
export const updatePaymentMethod = ({ _id, ...update }) => {
  return paymentMethodSchema.findByIdAndUpdate(_id, update, { new: true });
};

// delete
export const deletePaymentMethod = (_id) => {
  return paymentMethodSchema.findByIdAndDelete(_id);
};
