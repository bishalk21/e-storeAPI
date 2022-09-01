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
  LONGSTR,
  NUMBER,
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

// ====payment method====

export const newPaymentMethodValidation = (req, res, next) => {
  // defined rules for validation
  const schema = Joi.object({
    name: SHORTSTR.required(),
    status: STATUS,
    description: LONGSTR.required(),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
}

// update payment method validation
export const updatePaymentMethodValidation = (req, res, next) => {
  // defined rules for validation
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    name: SHORTSTR.required(),
    status: STATUS.required(),
    description: LONGSTR.required(),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
}

// ====product====
export const newProductValidation = (req, res, next) => {
  // defined rules for validation
  const {
    salesPrice,
    salesStartDate,
    salesEndDate
  } = req.body;
  //sales Price is required if it is not a service product
  req.body.salesPrice = salesPrice ? salesPrice : 0;

  req.body.salesStartDate = !salesStartDate || salesStartDate === "null" ? null : salesStartDate;

  req.body.salesEndDate = !salesEndDate || salesEndDate === "null" ? null : salesEndDate;

  const schema = Joi.object({
    status: STATUS.required(),
    name: SHORTSTR.required(),
    sku: SHORTSTR.required(),
    description: LONGSTR.required(),
    price: NUMBER.required(),
    quantity: NUMBER.required(),
    salesPrice: NUMBER,
    salesStartDate: DATE.allow("", null),
    salesEndDate: DATE.allow("", null),
    catId: SHORTSTR.required(),
  });

  //give data type and value for validation
  validator(schema, req, res, next);
}