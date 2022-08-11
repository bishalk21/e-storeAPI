import Joi from "joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    // defined rules for validation
    const schema = Joi.object({
      fName: Joi.string().required().max(20),
      lName: Joi.string().required().max(20),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required()
        .max(20),
      password: Joi.string().required().max(20),
      phone: Joi.string().max(20),
      address: Joi.string().max(100).allow("", null),
      dob: Joi.date().allow("", null),
    });
    // give data type and value for validation
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyAdminUserValidation = (req, res, next) => {
  try {
    console.log(req.body);
    // defined rules for validation
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required()
        .max(20),
      emailValidationCode: Joi.string().required().max(100),
    });

    //give data type and value for validation
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }

    next(); // if no error then go to next middleware
  } catch (error) {
    next();
  }
};

export const loginValidation = (req, res, next) => {
  try {
    console.log(req.body);
    // defined rules for validation
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required()
        .max(20),
      emailValidationCode: Joi.string().required().max(100),
    });

    //give data type and value for validation
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }

    next(); // if no error then go to next middleware
  } catch (error) {
    next();
  }
};
