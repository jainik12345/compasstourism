const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageStateName.controller");

// Main CRUD
router.get("/", controller.getAllPackageStates);
router.post("/", controller.insertPackageState);
router.put("/:id", controller.updatePackageState);
router.delete("/:id", controller.deletePackageState);

// Filtered by country
router.get("/data/:countryId", controller.getPackageStatesByCountryId);
router.get(
  "/trashed/:countryId",
  controller.getTrashedPackageStatesByCountryId
);
router.put("/restore/:id", controller.restorePackageState);

module.exports = router;
