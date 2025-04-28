const crudRepository = require("./crud-reository");
const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");

const { Flight , Airport } = require("../models");

class FlightRepository extends crudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort) {
    try {
      const flights = await this.model.findAll({
        where: filter,
        order: sort,
        include: [
          {
            model: Airport,
            as: "departureAirport",
            attributes: ["id", "name", "cityID", "address"],
          },
          {
            model: Airport,
            as: "arrivalAirport",
            attributes: ["id", "name", "cityID", "address"],
          },
        ],
      });
      return flights;
    } catch (error) {
      console.log("Unexpected Error: ", error);
      throw new AppError(
        "Can't get all flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = FlightRepository;
