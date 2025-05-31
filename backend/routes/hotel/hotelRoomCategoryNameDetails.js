const express = require("express");
const router = express.Router();
const controller = require("../../controller/hotel/hotelRoomCategoryNameDetails.controller");

router.get("/", controller.getAllRoomCategoryDetails);
router.post("/", controller.insertRoomCategoryDetails);
router.put("/:id", controller.updateRoomCategoryDetails);
router.delete("/:id", controller.deleteRoomCategoryDetails);

router.patch("/restore/:id", controller.restoreRoomCategoryDetails);
router.get("/category/:categoryId", controller.getRoomCategoryDetailsByCategoryId);
router.get("/trashed/category/:categoryId", controller.getTrashedRoomCategoryDetailsByCategoryId);

module.exports = router;