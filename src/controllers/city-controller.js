const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /cities
 * req-body :{name : "Mumbai"}
 */
async function createCity(req, res) {
    try {
      const city = await CityService.createCity({
        name: req.body.name
      });
      SuccessResponse.data = city;
      return res.status(StatusCodes.CREATED)
      .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
  }




// GET :: /cities
async function getAllCities(req, res) {
    try {
      const cities = await CityService.getAllCities();
      SuccessResponse.data = cities;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
  }

  
// GET :: /cities/:id
async function getCity(req, res) {
    try {
      const city = await CityService.getCity(req.params.id);
      SuccessResponse.data = city;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
}  




// DELETE :: /cities/:id
async function deleteCity(req, res) {
    try {
      const city = await CityService.deleteCity(req.params.id);
      SuccessResponse.data = city;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
  }



// PATCH :: /cities/:id
async function updateCity(req, res) {
    try {
      const city = await CityService.updateCity({
        id: req.params.id,
        ...req.body
      });
      SuccessResponse.data = city;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }


  module.exports = {
    createCity,
    getAllCities,
    getCity,
    deleteCity,
    updateCity,
  }