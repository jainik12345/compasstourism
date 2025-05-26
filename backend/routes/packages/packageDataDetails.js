const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageDataDetails.controller");

router.get("/", controller.getPackageData);
router.get("/trashed", controller.getTrashedPackageData);
router.get("/:id", controller.getPackageDataById);
router.post("/", controller.insertPackageData);
router.put("/:id", controller.updatePackageData);
router.delete("/:id", controller.deletePackageData);
router.patch("/restore/:id", controller.restorePackageData);

router.get("/byPackageId/:id", controller.getPackageDataByPackageNameId);


// Get all package names
router.get("/packageNames", controller.getPackageNames);

// Get trashed package data by package_name_id
router.get("/trashed/by-package/:id", controller.getTrashedByPackageId);



module.exports = router;
