const router = require("express").Router();
const controller = require("../../controller/hotel/hotelFacilitiesDetails.controller");

// Get all active hotel facilities details
router.get("/", controller.getHotelFacilitiesDetails);

// Get all trashed (soft deleted) hotel facilities details
router.get("/trashed", controller.getTrashedHotelFacilitiesDetails);

// Get hotel facilities details by hotel_id
router.get("/:hotel_id", controller.getHotelFacilitiesDetailsByHotelId);

// Add hotel facilities details
router.post("/", controller.insertHotelFacilitiesDetails);

// Update hotel facilities details
router.put("/:id", controller.updateHotelFacilitiesDetails);

// Soft delete a hotel facilities details
router.delete("/:id", controller.deleteHotelFacilitiesDetails);

// Restore a soft-deleted hotel facilities details
router.patch("/restore/:id", controller.restoreHotelFacilitiesDetails);

module.exports = router;