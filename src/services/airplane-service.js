const { StatusCodes } = require("http-status-codes");
const { AirplanesRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const airplaneRepository = new AirplanesRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === TypeError) {
      throw new AppError(
        "can not create a New airplane object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
}

module.exports = {
  createAirplane,
};
