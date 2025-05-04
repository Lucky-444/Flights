function addRowQueryLocksOnFlights(flightId){
  return `SELECT * FROM FLights where Flights.id = ${flightId} FOR UPDATE ;`
}

module.exports={
        addRowQueryLocksOnFlights,
}