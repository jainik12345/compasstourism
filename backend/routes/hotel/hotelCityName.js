const router = require("express").Router();
const hotelCityController = require("../../controller/hotel/hotelCityName.controller");

router.get("/", hotelCityController.getHotelCities);
router.post("/", hotelCityController.insertHotelCity);
router.put("/:id", hotelCityController.updateHotelCity);
router.delete("/:id", hotelCityController.deleteHotelCity);
router.get("/trashed", hotelCityController.getTrashedHotelCities);
router.patch("/restore/:id", hotelCityController.restoreHotelCity);

module.exports = router;
