const express = require("express");
const router = express.Router();
const controller = require("../../controller/packages/packageDataAreaName.controller");

// Main CRUD
router.get("/", controller.getAllMappings);
router.post("/", controller.insertMapping);
router.put("/:id", controller.updateMapping);
router.delete("/:id", controller.deleteMapping);

// Filtered by package_data_id
router.get("/data/:packageDataId", controller.getByPackageDataId);
router.get("/trashed/:packageDataId", controller.getTrashedByPackageDataId);
router.put("/restore/:id", controller.restoreMapping);

module.exports = router;
