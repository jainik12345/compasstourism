const express = require("express");
const router = express.Router();
const controller = require("../../controller/hotel/hotelName.controller");

router.get("/", controller.getAllHotels);
router.post("/", controller.insertHotel);
router.put("/:id", controller.updateHotel);
router.delete("/:id", controller.deleteHotel);

router.patch("/restore/:id", controller.restoreHotel);
router.get("/city/:cityId", controller.getHotelsByCityId);
router.get("/trashed/city/:cityId", controller.getTrashedHotelsByCityId); 

module.exports = router;
