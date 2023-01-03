import Joi from "joi";

export const newAdminUserValidation = (req,res,next) => {
    try {
        // define rules
        const schema = Joi.object({
            firstName: Joi.string().max(20).required(),
            lastName: Joi.string().max(20).required(),
            email: Joi.string().email({minDomainSegments: 2}),
            password: Joi.string().max(100).required(),
            phone: Joi.string().max(100).required(),
            address: Joi.string().max(100),
            dob: Joi.date().allow("", null),
        })
    // give data to the rules
    const {error} = schema.validate(req.body);
    // console.log(error);

    // check if there is any error
    // error ? next(error) : next();

        if (error){
            error.status = 200;
            return next(error)
        }

        next()

    } catch (error) {
        next(error)
    }
}

export const emailVerificationValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}),
            emailValidateCode: Joi.string().max(100).required(),
        })

        const {error} = schema.validate(req.body);
        // console.log(error);

        if (error){
            error.status = 200;
            return next(error)
        }

        next()

    } catch (error) {
        next(error)
    }
}