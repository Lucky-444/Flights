const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["flightNumber should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["airplaneId should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["departureAirportId should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["arrivalAirportId should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["price should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["totalSeats should not be null"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(req.body.price < 0){
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["price should not be negative"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  
//## Check arrivalTime > departureTime
  const departureTime = new Date(req.body.departureTime);
  const arrivalTime = new Date(req.body.arrivalTime);

  if (arrivalTime <= departureTime) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["Arrival time must be greater than departure time"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest };
