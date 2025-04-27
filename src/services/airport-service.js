const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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
      "Can't create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}










async function getAllAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    console.log("Unexpected Error: ", error);
    throw new AppError(
      "Can't get all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}







async function getAirports(data) {
  try {
    const airport = await airportRepository.get(data);
    return airport;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Can't get a airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}









async function updateAirport(data) {
  try {
    const airport = await airportRepository.update(data.id, data);
    return airport;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError("Can't update a airport", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}








async function deleteAirport(data) {
  try {
    const airport = await airportRepository.destroy(data);
    return airport;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError("Can't delete a airport", StatusCodes.INTERNAL_SERVER_ERROR);
  }     
}


module.exports = {
  createAirport,
  getAllAirports,
  getAirports,
  updateAirport,
  deleteAirport,
};