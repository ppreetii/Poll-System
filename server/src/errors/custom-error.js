class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

CustomError.prototype.serializeErrors = function () {
    throw new Error("Method 'serializeErrors' must be implemented in derived classes");
};

module.exports = CustomError;
