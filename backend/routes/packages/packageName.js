const express = require("express");
const router = express.Router();
const packageNameController = require("../../controller/packages/packageName.controller");

// Main CRUD
router.get("/", packageNameController.getAllPackages);
router.post("/", packageNameController.insertPackage);
router.put("/:id", packageNameController.updatePackage);
router.delete("/:id", packageNameController.deletePackage);

// Get packages by country ID
router.get("/country/:countryId", packageNameController.getPackagesByCountryId);

// Get trashed packages by country ID
router.get("/trashed/country/:countryId", packageNameController.getTrashedPackagesByCountryId);

// Restore soft-deleted package
router.put("/restore/:id", packageNameController.restorePackage);

module.exports = router;
