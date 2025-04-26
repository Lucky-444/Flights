const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req , res , next){
        if(!req.body.name){
            ErrorResponse.message = "Something Went Wrong WHile Creating City";
            ErrorResponse.error = new AppError(["City Name is required"], StatusCodes.BAD_REQUEST);
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
}

module.exports = {
    validateCreateRequest
}