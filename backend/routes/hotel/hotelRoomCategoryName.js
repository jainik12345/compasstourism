const router = require("express").Router();
const controller = require("../../controller/hotel/hotelRoomCategoryName.controller");

router.get("/", controller.getHotelRoomCategoryName);
router.get("/trashed", controller.getTrashedHotelRoomCategoryName);
router.get("/:hotel_id", controller.getHotelRoomCategoryNameByHotelId);
router.post("/", controller.insertHotelRoomCategoryName);
router.put("/:id", controller.updateHotelRoomCategoryName);
router.delete("/:id", controller.deleteHotelRoomCategoryName);
router.patch("/restore/:id", controller.restoreHotelRoomCategoryName);

module.exports = router;