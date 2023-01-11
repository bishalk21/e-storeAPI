import Joi from "joi";
import { LONGSTR, SHORTSTR, STATUS, validator } from "./constant.js";

export const newPaymentMethodValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  // give data to te rules
  validator(schema, req, res, next);
};

// update
export const updatePaymentMethodValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS.required(),
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  // give data to te rules
  validator(schema, req, res, next);
};
