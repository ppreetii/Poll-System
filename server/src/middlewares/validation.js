const joi = require("joi");

const RequestValidationError = require("../errors/validation-error");

exports.validateRequest = (schema, hasParams = false, paramsSchema = null) =>
  async function (req, res, next) {
    try {
      if (hasParams) {
        await paramsSchema.validateAsync(req.params.id, {
          abortEarly: false,
        });
      }
      
      if (schema) {
        await schema.validateAsync(req.body, {
          abortEarly: false,
        });
      }

      next();
    } catch (error) {
      next(new RequestValidationError(error));
    }
  };
