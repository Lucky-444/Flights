const crudRepository = require("./crud-reository");

const { Flight } = require("../models");

class FlightRepository extends crudRepository {
        constructor() {
                super(Flight);
        }
}        
module.exports = FlightRepository;