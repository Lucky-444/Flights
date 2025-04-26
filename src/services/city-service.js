const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const cityRepository = new CityRepository();

// POST :: /cities
async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    console.log(error);

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = [],
        errors = error.errors;
      errors.forEach((err) => {
        explanation.push(err.message);
      });
      // Consider using a logging library here

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    // Catching any other errors

    throw new AppError(
      "Can't create a new CITY object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// GET :: /cities
async function getAllCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    console.log("Unexpected Error: ", error);
    throw new AppError(
      "Can't get all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// GET :: /cities/:id
async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Can't get a city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


//DELETE :: /cities/:id
async function deleteCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Can't delete a city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// PATCH :: cities/:id
async function updateCity(data) {
  try {
    const city = await cityRepository.update(data.id, data);
    return city;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError("data not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError("Can't update a city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports = { 
  createCity,
  getAllCities,
  getCity,
  deleteCity,
  updateCity, 
};
