const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data); 
        return city;
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


module.exports = {createCity};
