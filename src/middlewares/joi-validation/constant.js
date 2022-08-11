import Joi from 'joi';

export const FNAME = Joi.string().min(1).max(30);
export const LNAME = Joi.string().min(1).max(30);
export const EMAIL = Joi.string().email({
    minDomainSegments: 2
});
export const PASSWORD = Joi.string().min(6).max(30);
export const CONFIRM_PASSWORD = Joi.string().min(6).max(30);
export const PHONE = Joi.string().min(10).max(10);
export const ADDRESS = Joi.string().min(1).max(30);
export const DATE = Joi.date();
export const SHORTSTR = Joi.string().min(1).max(50);
export const LONGSTR = Joi.string().min(1).max(5000);

export const validator = (schema, req, res, next) => {
    const {
        error
    } = schema.validate(req.body);
    if (error) {
        error.status = 200;
        return next(error);
    }

    next();
}