const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");
const { UPDATE } = require("sequelize/lib/query-types");

/**
 * Create a new flight
 * @route POST :: /flights
 * @param {object} req.body - flight object
 * @param {object} req.body - flight object{
 *  flightNumber
 *  airplaneId
 *  ......
 * }
 * @returns {object} 200 - flight object
 */

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
        flightNumber : req.body.flightNumber,
        airplaneId : req.body.airplaneId,
        departureAirportId : req.body.departureAirportId,
        arrivalAirportId : req.body.arrivalAirportId,
        departureTime : req.body.departureTime,
        arrivalTime : req.body.arrivalTime,
        price : req.body.price,
        boardingGate : req.body.boardingGate,
        totalSeats : req.body.totalSeats
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}




async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}


/**
 * @route POST :: /flights/:id 
 * @param {*} req 
 * @param {*} res 
 */

async function getFlights(req , res){
  try {
    const flight = await FlightService.getFlights(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}



/**
 * @route UPDATE_SEATS :: /flights/:id
 * @param {*} req 
 * @param {*} res
 * 
 */

async function updateSeats(req, res) {
  try {
    const flight = await FlightService. updateFlightSeats({
      flightId : req.params.id,
      seats : req.body.seats,
      dec : req.body.dec
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
  
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlights,
  updateSeats,
  
};
