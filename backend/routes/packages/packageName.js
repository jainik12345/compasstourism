const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageName.controller");

router.get("/", controller.getAllPackages);
router.post("/", controller.insertPackage);
router.put("/:id", controller.updatePackage);
router.delete("/:id", controller.deletePackage);
router.get("/country/:countryId", controller.getPackagesByCountryId);
router.get(
  "/trashed/country/:countryId",
  controller.getTrashedPackagesByCountryId
);
router.put("/restore/:id", controller.restorePackage);

router.get("/by-state/:stateId", controller.getPackageNamesByStateId);


 

module.exports = router;
