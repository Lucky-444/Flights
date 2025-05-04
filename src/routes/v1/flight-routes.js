const express = require("express");
const router = express.Router();

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

// api/v1/flights :: post
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);


// api/v1/flights?trips=MUM-DEL :: get
router.get("/", FlightController.getAllFlights);

// api/v1/flights/:id
router.post("/:id" , FlightController.getFlights);






module.exports = router;  