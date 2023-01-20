import Joi from "joi";
import {
  ADDRESS,
  DATE,
  EMAIL,
  FIRSTNAME,
  LASTNAME,
  LONGSTR,
  PASSWORD,
  PHONE,
  SHORTSTR,
  validator,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    firstName: FIRSTNAME.required(),
    lastName: LASTNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE.required(),
    address: ADDRESS,
    dob: DATE,
  });
  // give data to the rules
  validator(schema, req, res, next);
};

// email verification
export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    emailValidateCode: LONGSTR.required(),
  });
  // give data to the rules
  validator(schema, req, res, next);
};

// login validation
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: PASSWORD,
  });
  // give data to the rules
  validator(schema, req, res, next);
};

// update admin user validation
export const updateAdminUserValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    firstName: FIRSTNAME.required(),
    lastName: LASTNAME.required(),
    phone: PHONE.required(),
    address: ADDRESS,
    dob: DATE,
  });
  // give data to the rules
  validator(schema, req, res, next);
};
