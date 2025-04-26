const crudRepository = require("./crud-reository");
const { City } = require("../models");


class CityRepository extends crudRepository{
    constructor(){
        super(City);
    }

}


module.exports = CityRepository