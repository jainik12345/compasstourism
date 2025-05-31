const   router = require("express").Router();
const controller = require("../../controller/hotel/hotelMultipleImages.controller");

router.get("/", controller.getHotelMultipleImages);
router.get("/trashed", controller.getTrashedHotelMultipleImages);
router.get("/:hotel_id", controller.getHotelMultipleImagesByHotelId);
router.post("/", controller.insertHotelMultipleImages);
router.put("/:id", controller.updateHotelMultipleImages);
router.delete("/:id", controller.deleteHotelMultipleImages);
router.patch("/restore/:id", controller.restoreHotelMultipleImages);

module.exports = router;
