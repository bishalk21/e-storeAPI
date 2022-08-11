import Joi from "joi";
import {
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  PASSWORD,
  PHONE,
  SHORTSTR,
  validator,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // defined rules for validation
  const schema = Joi.object({
    fName: FNAME.required(),
    lName: LNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE,
    address: ADDRESS,
    dob: DATE.allow("", null),
  });
  // give data type and value for validation
  validator(req.body, schema, res, next);
};

export const verifyAdminUserValidation = (req, res, next) => {
  console.log(req.body);
  // defined rules for validation
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });

  //give data type and value for validation
  validator(req.body, schema, res, next);
};

export const loginValidation = (req, res, next) => {
  console.log(req.body);
  // defined rules for validation
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });

  //give data type and value for validation
  validator(req.body, schema, res, next);
};
