const { StatusCodes } = require("http-status-codes");
const { AirplanesRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const airplaneRepository = new AirplanesRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
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
      "Can't create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    console.log("Unexpected Error: ", error);
    throw new AppError(
      "Can't get all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(data) {
  try {
    const airplane = await airplaneRepository.get(data);

    return airplane;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Can't get a airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirplane(data) {
  try {
    console.log("Update input:", data); // 
    const airplane = await airplaneRepository.update(data.id, data);
    return airplane;
  } catch (error) {
     
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError("Can't update a airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


async function deleteAirplane(data) {
  try {
    const airplane = await airplaneRepository.destroy(data);
    console.log(airplane);

    return airplane;
  }catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Can't delete a airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  updateAirplane,
  deleteAirplane,
};
