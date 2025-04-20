const crudRepository = require("./crud-reository");
const { Airplane } = require("../models");


class AirplanesRepository extends crudRepository{
    constructor(){
        super(Airplane);
    }


    async someRawQuery(){

    }
}


module.exports = AirplanesRepository