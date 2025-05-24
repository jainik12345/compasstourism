const router = require("express").Router();
const controller = require("../../controller/about/aboutImageSection.controller");

router.get("/", controller.getAboutImageSection);
router.get("/trashed", controller.getTrashedAboutImageSection);
router.get("/:id", controller.getAboutImageSectionById);
router.post("/", controller.insertAboutImageSection);
router.put("/:id", controller.updateAboutImageSection);
router.delete("/:id", controller.deleteAboutImageSection);
router.patch("/restore/:id", controller.restoreAboutImageSection);

module.exports = router;
