const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /airplanes
 * req-body :{ modelNumber :" airBus-320" , capacity : 200}
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,  
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}


async function getAllAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}





/**
 * GET : /airplanes/:id
 * req-body :{ modelNumber :" airBus-320" , capacity : 200}
 */
async function getAirplane(req , res) {
    try {
      const airplane = await AirplaneService.getAirplane(req.params.id);
      SuccessResponse.data = airplane;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
}



async function deleteAirplane(req , res) {
  try {
    const airplane = await AirplaneService.deleteAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}

async function updateAirplane(req , res) {
  try {
    const airplane = await AirplaneService.updateAirplane({
      id: req.params.id,
      ...req.body
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}





module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
