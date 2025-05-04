const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [],
        errors = error.errors;
      errors.forEach((err) => {
        explanation.push(err.message);
      });
      // Consider using a logging library here
      console.log("Validation Errors: ", explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    // Catching any other errors
    console.log("Unexpected Error: ", error);
    throw new AppError(
      "Can't create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  //trips : MUM-DEL
  if (query.trips) {
    let [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        "Departure and arrival airport can't be same",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [
        minPrice,
        maxPrice === undefined ? Number.MAX_SAFE_INTEGER : maxPrice,
      ],
    };
  }

  if (query.travellers) {
    //the number of seats should be greater than or equal to the number of travellers
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + " 23:59:59"],
    };
  }

  if (query.sort) {
    let params = query.sort.split(",");
    const sortParams = params.map((param) => param.split("_"));
    sortFilter = sortParams;
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    console.log("Unexpected Error:", error);
    throw new AppError(
      "Can't get all flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlights(id){
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
      if(error.StatusCodes === StatusCodes.NOT_FOUND){
         throw new AppError("The flight you requested is not available" , error.statuscode);
         
      }
      throw new AppError("Can not fetch data of the flights" , StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlights,
};
