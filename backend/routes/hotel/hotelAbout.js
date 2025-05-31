const router = require("express").Router();
const controller = require("../../controller/hotel/hotelAbout.controller");

router.get("/", controller.getHotelAbout);
router.get("/trashed", controller.getTrashedHotelAbout);
router.get("/:hotel_id", controller.getHotelAboutByHotelId);
router.post("/", controller.insertHotelAbout);
router.put("/:id", controller.updateHotelAbout);
router.delete("/:id", controller.deleteHotelAbout);
router.patch("/restore/:id", controller.restoreHotelAbout);

module.exports = router;
