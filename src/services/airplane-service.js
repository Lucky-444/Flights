const { StatusCodes } = require("http-status-codes");
const { AirplanesRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");


const airplaneRepository = new AirplanesRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === 'SequelizeValidateError') {
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
      "Can't create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = {
  createAirplane,
};
