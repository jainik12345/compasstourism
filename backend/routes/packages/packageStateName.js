const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageStateName.controller");

router.get("/", controller.getAllPackageStates);
router.post("/", controller.insertPackageState);
router.put("/:id", controller.updatePackageState);
router.delete("/:id", controller.deletePackageState);
router.patch("/restore/:id", controller.restorePackageState);
router.get("/country/:countryId", controller.getPackageStatesByCountryId);
router.get(
  "/trashed/country/:countryId",
  controller.getTrashedPackageStatesByCountryId
);

 
router.get("/data/:id", controller.getPackageStateById);

module.exports = router;
