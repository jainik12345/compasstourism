const router = require("express").Router();
const controller = require("../controller/ContactSectionAddress.controller");

router.get("/", controller.getContactAddresses);
router.post("/insert", controller.insertContactAddress);
router.put("/update/:id", controller.updateContactAddress);
router.delete("/delete/:id", controller.deleteContactAddress);
router.get("/trashed", controller.getTrashedContactAddresses);
router.patch("/restore/:id", controller.restoreContactAddress);

module.exports = router;
