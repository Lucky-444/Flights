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
router.get("/:id" , FlightController.getFlights);

// api/v1/flights/seats PATCH
router.patch("/:id/seats" , FlightMiddlewares.validateUpdateSeatRequest, FlightController.updateSeats);




module.exports = router;  