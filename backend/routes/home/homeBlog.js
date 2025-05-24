const router = require("express").Router();
const controller = require("../../controller/home/homeBlog.controller");

router.get("/", controller.getHomeBlog);
router.get("/trashed", controller.getTrashedHomeBlog);
router.get("/:id", controller.getHomeBlogById);
router.post("/", controller.insertHomeBlog);
router.put("/:id", controller.updateHomeBlog);
router.delete("/:id", controller.deleteHomeBlog);
router.patch("/restore/:id", controller.restoreHomeBlog);

module.exports = router;
