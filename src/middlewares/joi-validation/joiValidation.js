import Joi from "joi";
import {
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  ADDRESS,
  PASSWORD,
  PHONE,
  SHORTSTR,
  validator,
  STATUS,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // defined rules for validation
  const schema = Joi.object({
    fName: FNAME.required(),
    lName: LNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE,
    address: ADDRESS.allow("", null),
    dob: DATE.allow("", null),
  });
  // give data type and value for validation
  validator(schema, req, res, next);
};

export const verifyAdminUserValidation = (req, res, next) => {
  // console.log(req.body);
  // defined rules for validation
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  // console.log(req.body);
  // defined rules for validation
  const schema = Joi.object({
    email: EMAIL.required(),
    password: PASSWORD.required(),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
};

// category

export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  // defined rules for validation
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
}

// update category validation

export const updateCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  // defined rules for validation
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
}