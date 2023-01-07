import Joi from "joi";
import { SHORTSTR, STATUS, validator } from "./constant.js";

export const newCategoryValidation = (req, res, next) => {
  req.body.parentCatId = req.body.parentCatId ? req.body.parentCatId : null;

  // define rules
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentCatId: SHORTSTR.allow("", null),
  });
  // give data to rules
  validator(schema, req, res, next);
};
