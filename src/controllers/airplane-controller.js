const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorRespone, SuccessResponse } = require("../utils/common");

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
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorRespone.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorRespone);
  }
}

module.exports = {
  createAirplane,
};
