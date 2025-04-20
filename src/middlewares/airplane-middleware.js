const { Statuscodes } = require("http-status-codes");
const { ErrorRespone , SuccessResponse } = require("../utils/common")
function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorRespone.message  = "Model Number is required",
    ErrorRespone.error = {explanation: "ModelNumber not found"}
     
    return res.status(Statuscodes.BAD_REQUEST).json(ErrorRespone);
  }
 
  next();
}

module.exports = {
  validateCreateRequest,
};
