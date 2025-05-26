const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageAreaName.controller");

// Main CRUD
router.get("/", controller.getAllPackageAreas);
router.post("/", controller.insertPackageArea);
router.put("/:id", controller.updatePackageArea);
router.delete("/:id", controller.deletePackageArea);

// Filtered by state
router.get("/data/:stateId", controller.getPackageAreasByStateId);
router.get("/trashed/:stateId", controller.getTrashedPackageAreasByStateId);
router.put("/restore/:id", controller.restorePackageArea);

module.exports = router;
