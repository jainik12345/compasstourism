const router = require("express").Router();
const privatePolicyController = require("../controller/privatePolicy.controller");

router.route("/").get(privatePolicyController.getprivatePolicy);
router.put("/update/:id", privatePolicyController.updatePrivatePolicy);
router.post("/insert", privatePolicyController.insertPrivatePolicy);
router.delete("/delete/:id", privatePolicyController.deletePrivatePolicy);
router.get("/trashed", privatePolicyController.getTrashedPrivatePolicy);
router.patch("/restore/:id", privatePolicyController.restorePrivatePolicy);

module.exports = router;
