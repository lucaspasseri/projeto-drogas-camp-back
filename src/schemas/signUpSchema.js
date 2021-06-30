import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string()
    .min(3)
    .max(30)
    .required(),
    email: joi.string().email().required(),
    password: joi.string()
    .min(6)
    .max(10)
    .required(),
    confirmPassword: joi.ref('password')
});

export {
    signUpSchema
}