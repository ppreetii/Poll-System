const CustomError = require("./custom-error");

class PageNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Page Not Found Error");
    Object.setPrototypeOf(this, PageNotFoundError.prototype);
  }

  serializeErrors(){
    return [
      {
        message: "Page Not Found",
      },
    ];
  }
}

module.exports = PageNotFoundError;