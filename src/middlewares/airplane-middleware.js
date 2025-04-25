const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something Went Wrong",

    // ErrorResponse.error = { explanation: "ModelNumber is not found" };
    ErrorResponse.error = new AppError(["Model Number is required"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next(); 
}

module.exports = {
  validateCreateRequest,
};
