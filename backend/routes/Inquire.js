const router = require("express").Router();
const Controller = require("../controller/Inquire.controller");

router.get("/", Controller.getInquire);
router.post("/", Controller.insertInquire);
router.post("/reply", Controller.replyToInquire);
router.get("/trashed", Controller.getTrashedInquire);
router.delete("/:id", Controller.deleteInquire);
router.patch("/restore/:id", Controller.restoreInquire);

module.exports = router;
