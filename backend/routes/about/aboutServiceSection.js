const router = require("express").Router();
const controller = require("../../controller/about/aboutServiceSection.controller");

router.get("/", controller.getAboutServiceSection);
router.get("/trashed", controller.getTrashedAboutServiceSection);
router.get("/:id", controller.getAboutServiceSectionById);
router.post("/", controller.insertAboutServiceSection);
router.put("/:id", controller.updateAboutServiceSection);
router.delete("/:id", controller.deleteAboutServiceSection);
router.patch("/restore/:id", controller.restoreAboutServiceSection);

module.exports = router;
