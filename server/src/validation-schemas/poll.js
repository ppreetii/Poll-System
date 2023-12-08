const joi = require("joi");
const {isValidObjectId} = require("mongoose");

const createPollSchema = joi.object().keys({
  question: joi.string().required(),
  optionA: joi.string().required(),
  optionB: joi.string().required(),
  optionC: joi.string().required(),
  optionD: joi.string().required()
});

const getPollSchema = joi.string().custom((value, helpers) => {
  if (!isValidObjectId(value)) return helpers.message("Invalid Poll ID");

  return value;
});

const updatePollSchema = joi.object().keys({
  optionA: joi.boolean(),
  optionB: joi.boolean(),
  optionC: joi.boolean(),
  optionD: joi.boolean()
}).oxor('optionA', 'optionB', 'optionC','optionD');

module.exports = {
  createPollSchema,
  getPollSchema,
  updatePollSchema,
};
