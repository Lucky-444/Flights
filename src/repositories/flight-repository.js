const crudRepository = require("./crud-reository");
const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");
const { Sequelize }  = require('sequelize');
const db = require("../models");

const { Flight , Airport , Airplane, City } = require("../models");

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
            attributes: ["id", "name","code", "cityID", "address"],
            include : [
              {
                model : City,
                attributes : ["id","name"] 
              }
            ]
          },
          {
            model: Airport,
            as: "arrivalAirport",
            attributes: ["id", "name","code", "cityID", "address"],
            include : [
              {
                model : City,
                attributes : ["id","name"]
              }
            ]
          },
          {
            model: Airplane,
            attributes: ["id", "modelNumber", "capacity"],
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


  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(`select * from flights where flights.id = ${flightId} FOR UPDATE ;`);

    try {
      const flight = await Flight.findByPk(flightId);
      if (!flight) {
        throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
      }
  
      if (dec === 'true' || dec === true) {
        await flight.decrement('totalSeats', { by: seats });
      } else {
        await flight.increment('totalSeats', { by: seats }); 
      }
  
      // Reload the flight to get the updated values
      await flight.reload();
      return flight; // returns updated flight object
    } catch (error) {
      console.error("Something went wrong in updateRemainingSeats:", error);
      throw new AppError("Can't update a flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

}





module.exports = FlightRepository;
