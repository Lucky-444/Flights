const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something Went Wrong While Creating Airport";
    ErrorResponse.error = new AppError(
      ["Airport Name is required"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = "Something Went Wrong While Creating Airport";
    ErrorResponse.error = new AppError(
      ["City Id is required"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = "Something Went Wrong While Creating Airport";
    ErrorResponse.error = new AppError(
      ["Airport Code is required"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest };
