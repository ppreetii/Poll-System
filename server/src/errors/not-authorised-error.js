const CustomError = require("./custom-error");

class NotAuthorisedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Not Authorized"
      },
    ];
  }
}

module.exports = NotAuthorisedError;
