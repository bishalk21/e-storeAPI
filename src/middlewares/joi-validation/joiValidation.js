import Joi from "joi";
import {
  ADDRESS,
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  LONGSTR,
  PASSWORD,
  PHONE,
  SHORTSTR,
  STATUS,
  validator,
  NUMBER,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // defind rules
  const schema = Joi.object({
    fName: FNAME.required(),
    lName: LNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE,
    address: ADDRESS,
    dob: DATE.allow("", null),
  });
  // give data to the rules

  validator(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    password: PASSWORD.required(),
  });

  validator(schema, req, res, next);
};

// ===== categories
export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });

  validator(schema, req, res, next);
};

export const updateCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
    _id: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

// ========payment methods
export const newPaymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  validator(schema, req, res, next);
};

export const updatePaymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS.required(),
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  validator(schema, req, res, next);
};

// ======== Products validation
export const newProductValidation = (req, res, next) => {
  const {
    salesPrice,
    salesStartDate,
    salesEndDate
  } = req.body;

  req.body.salesPrice = salesPrice ? salesPrice : 0;

  req.body.salesStartDate = !salesStartDate || salesStartDate === "null" ? null : salesStartDate;
  req.body.salesEndDate = !salesEndDate || salesEndDate === "null" ? null : salesEndDate;

  // console.log();

  const schema = Joi.object({
    status: STATUS.required(),
    name: SHORTSTR.required(),
    sku: SHORTSTR.required(),
    description: LONGSTR.required(),
    qty: NUMBER.required(),
    price: NUMBER.required(),
    salesPrice: NUMBER,
    salesStartDate: DATE.allow(null),
    salesEndDate: DATE.allow(null),
    catId: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

export const updateProductValidation = (req, res, next) => {
  const {
    salesPrice,
    salesStartDate,
    salesEndDate
  } = req.body;

  req.body.salesPrice = salesPrice ? salesPrice : 0;

  req.body.salesStartDate = !salesStartDate || salesStartDate === "null" ? null : salesStartDate;
  req.body.salesEndDate = !salesEndDate || salesEndDate === "null" ? null : salesEndDate;

  // console.log();

  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS.required(),
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
    qty: NUMBER.required(),
    price: NUMBER.required(),
    salesPrice: NUMBER,
    salesStartDate: DATE.allow(null),
    salesEndDate: DATE.allow(null),
    catId: SHORTSTR.required(),
    images: LONGSTR.required(),
    thumbnail: LONGSTR.required(),
    imgToDel: LONGSTR.allow(null, ""),
  });

  validator(schema, req, res, next);
};

// ======== update user
export const updateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    fName: FNAME.required(),
    lName: LNAME.required(),
    phone: PHONE,
    address: ADDRESS,
    dob: DATE.allow("", null),
  });

  validator(schema, req, res, next);
}

// ======== update user password validation
export const updateUserPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    password: SHORTSTR.required(),
    newPassword: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
}

// ======== update user password validation
export const resetAdminPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    password: SHORTSTR.required(),
    otp: NUMBER.required(),
  });

  validator(schema, req, res, next);
}