const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/cities :: POST
router.post("/",  CityMiddlewares.validateCreateRequest,CityController.createCity);


// /api/v1/cities :: GET
router.get("/", CityController.getAllCities);


// /api/v1/cities/:id :: GET
router.get("/:id", CityController.getCity);


// /api/v1/cities/:id :: DELETE
router.delete("/:id", CityController.deleteCity);


// /api/v1/cities/:id :: PATCH
router.patch("/:id", CityController.updateCity);


module.exports = router;