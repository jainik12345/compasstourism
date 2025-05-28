const router = require("express").Router();
const termsConditionsController = require("../controller/termsConditions.controller");

router
  .route("/")
  .get(termsConditionsController.gettermsConditions)
  .post(termsConditionsController.posttermsConditions);

router.post("/insert", termsConditionsController.insertTermsConditions);
router.put("/update/:id", termsConditionsController.updateTermsConditions);
router.delete("/delete/:id", termsConditionsController.deleteTermsConditions);

router.get("/trashed", termsConditionsController.getTrashedTermsConditions);
router.patch("/restore/:id", termsConditionsController.restoreTermsConditions);

module.exports = router;
