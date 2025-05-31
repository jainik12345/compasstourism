const router = require("express").Router();
const controller = require("../../controller/hotel/hotelTestimonial.controller");

router.get("/", controller.getHotelTestimonial);
router.get("/trashed", controller.getTrashedHotelTestimonial);
router.get("/:hotel_id", controller.getHotelTestimonialByHotelId);
router.post("/", controller.insertHotelTestimonial);
router.put("/:id", controller.updateHotelTestimonial);
router.delete("/:id", controller.deleteHotelTestimonial);
router.patch("/restore/:id", controller.restoreHotelTestimonial);

module.exports = router;