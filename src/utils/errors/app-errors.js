  class AppError extends Error {
  constructor(message, statuscode) {
    super(message);
    (this.statuscode = statuscode), 
    (this.explanation = message);
  }
}

module.exports = AppError;
