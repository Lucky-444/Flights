const CrudRepository = require("./crud-reository");               
const { Airport } = require("../models");


class AirportRepository extends CrudRepository {
        constructor() {
                super(Airport);
        } 
}       

module.exports =  AirportRepository;