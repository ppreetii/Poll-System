const CustomError = require("./custom-error");

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error Connecting to Database";

  constructor() {
    super("Error connectin to Database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(){
    return [
      {
        message: this.reason,
      },
    ];
  }
}

module.exports = DatabaseConnectionError;