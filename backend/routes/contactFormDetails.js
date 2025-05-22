const router = require("express").Router();
const Controller = require("../controller/contactFormDetails.controller");

router.get("/", Controller.getContactForm);
router.post("/", Controller.insertContactForm);
router.post("/reply", Controller.replyToContactForm);
router.get("/trashed", Controller.getTrashedContactForm);
router.delete("/:id", Controller.deleteContactForm);
router.patch("/restore/:id", Controller.restoreContactForm);

module.exports = router;
