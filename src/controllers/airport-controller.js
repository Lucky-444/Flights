const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /airports
 * req-body :{name : "Mumbai" , cityId : 1 , code : "BOM" }
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      cityId: req.body.cityId,
      code: req.body.code ,
      address : req.body.address,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}



async function getAirports(req , res) {
  try {
    const airports = await AirportService.getAirports(req.params.id);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}


async function getAllAirports(req , res) {
  try {
    const airports = await AirportService.getAllAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
} 



async function updateAirport(req , res) {
  try {
    const airport = await AirportService.updateAirport({
      id: req.params.id,
      ...req.body
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}



async function deleteAirport(req , res) {
  try {
    const airport = await AirportService.deleteAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}


module.exports = {
  createAirport,
  getAllAirports,
  getAirports,
  updateAirport,
  deleteAirport,
};

