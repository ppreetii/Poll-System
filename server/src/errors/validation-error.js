const CustomError = require("./custom-error");

class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(errors) {
    super("Validation Error");
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
      return [
        {
          message: "Validation Error",
          field: this.errors.details?.map((err) => err.message).join(" ; "),
        },
      ];
  }
}

module.exports = RequestValidationError;