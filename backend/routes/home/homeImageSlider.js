const router = require("express").Router();
const controller = require("../../controller/home/homeImageSlider.controller");

router.get("/", controller.getHomeImageSlider);
router.get("/trashed", controller.getTrashedHomeImageSlider);
router.get("/:id", controller.getHomeImageSliderById);
router.post("/", controller.insertHomeImageSlider);
router.put("/:id", controller.updateHomeImageSlider);
router.delete("/:id", controller.deleteHomeImageSlider);
router.patch("/restore/:id", controller.restoreHomeImageSlider);

module.exports = router;


