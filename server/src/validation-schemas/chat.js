const joi = require("joi");
const {isValidObjectId} = require("mongoose");
const COMMON = require("../constants/common");

const createChatSchema = joi.object().keys({
  userId: joi
    .string()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message("Invalid User Id");

      return value;
    }),
  message: joi.string().required().min(COMMON.MSG_MIN_LEN),
});

module.exports = {
  createChatSchema,
};
