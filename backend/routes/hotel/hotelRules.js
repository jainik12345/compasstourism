const router = require("express").Router();
const controller = require("../../controller/hotel/hotelRules.controller");

// Get all active hotel rules
router.get("/", controller.getHotelRules);

// Get all trashed (soft deleted) hotel rules
router.get("/trashed", controller.getTrashedHotelRules);

// Get hotel rules by hotel_id
router.get("/:hotel_id", controller.getHotelRulesByHotelId);

// Add hotel rules
router.post("/", controller.insertHotelRules);

// Update hotel rules
router.put("/:id", controller.updateHotelRules);

// Soft delete hotel rules
router.delete("/:id", controller.deleteHotelRules);

// Restore a soft-deleted hotel rules
router.patch("/restore/:id", controller.restoreHotelRules);

module.exports = router;