const joi = require("joi");

const COMMON = require("../constants/common");

const createUserSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(COMMON.PSWD_MIN_LEN).required()
});

const loginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(COMMON.PSWD_MIN_LEN).required()
});

module.exports = {
    createUserSchema,
    loginSchema
}