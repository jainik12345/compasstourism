const router = require("express").Router();
const controller = require("../../controller/about/aboutHeroSection.controller");

router.get("/", controller.getAllHeroSections);
router.get("/trashed", controller.getTrashedHeroSections);
router.get("/:id", controller.getHeroSectionById);
router.post("/", controller.insertHeroSection);
router.put("/:id", controller.updateHeroSection);
router.delete("/:id", controller.deleteHeroSection);
router.patch("/restore/:id", controller.restoreHeroSection);

module.exports = router;
