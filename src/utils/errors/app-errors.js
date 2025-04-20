
class AppError extends Error {
  constructor(message) {
    super(message);
    (this.statuscode = statuscode), (this.message = message);
  }
}

module.exports = AppError