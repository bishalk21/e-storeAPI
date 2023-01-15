import Joi from "joi";
import {
  DATE,
  LONGSTR,
  SHORTSTR,
  SMALLNUMBER,
  STATUS,
  validator,
} from "./constant.js";

export const newProductValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    name: SHORTSTR.required(),
    status: STATUS.required(),
    sku: SHORTSTR.required(),
    description: LONGSTR.required(),
    quantity: SMALLNUMBER.required(),
    price: SMALLNUMBER.required(),
    salesPrice: SMALLNUMBER,
    salesStartDate: DATE.allow(null),
    salesEndDate: DATE.allow(null),
    parentCatId: SHORTSTR.required(),
  });

  // give data to the rules
  validator(schema, req, res, next);
};
