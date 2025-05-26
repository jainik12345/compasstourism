const router = require("express").Router();
const controller = require("../controller/ourAssociations.controller");

router.get("/", controller.getOurAssociations);
router.get("/trashed", controller.getTrashedOurAssociations);
router.post("/", controller.insertOrUpdateOurAssociations);
router.put("/:id", controller.updateOurAssociations);
router.delete("/", controller.deleteOurAssociations);
router.patch("/restore", controller.restoreOurAssociations);


module.exports = router;
