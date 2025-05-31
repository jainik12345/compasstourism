const router = require("express").Router();
const controller = require("../../controller/hotel/hotelFacilities.controller");

// Get all active hotel facilities
router.get("/", controller.getHotelFacilities);

// Get all trashed (soft deleted) hotel facilities
router.get("/trashed", controller.getTrashedHotelFacilities);

// Get hotel facilities by hotel_id
router.get("/:hotel_id", controller.getHotelFacilitiesByHotelId);

// Add hotel facilities (with image upload)
router.post("/", controller.insertHotelFacilities);

// Update hotel facilities (with image upload)
router.put("/:id", controller.updateHotelFacilities);

// Soft delete a hotel facility
router.delete("/:id", controller.deleteHotelFacilities);

// Restore a soft-deleted hotel facility
router.patch("/restore/:id", controller.restoreHotelFacilities);

module.exports = router;
