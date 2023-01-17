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
  const { salesPrice, salesStartDate, salesEndDate } = req.body;

  req.body.salesPrice = salesPrice ? salesPrice : 0;
  req.body.salesStartDate =
    !salesStartDate || salesStartDate === "null" ? null : salesStartDate;
  req.body.salesEndDate =
    !salesEndDate || salesEndDate === "null" ? null : salesEndDate;

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
