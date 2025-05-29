const router = require("express").Router();
const controller = require("../../controller/home/homeMultipleImages.controller");

router.get("/", controller.getHomeCertificate);
router.get("/trashed", controller.getTrashedHomeCertificate);
router.get("/:id", controller.getHomeCertificateById);
router.post("/", controller.insertHomeCertificate);
router.put("/:id", controller.updateHomeCertificate);
router.delete("/:id", controller.deleteHomeCertificate);
router.patch("/restore/:id", controller.restoreHomeCertificate);

module.exports = router;
