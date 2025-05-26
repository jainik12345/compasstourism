const router = require("express").Router();
const packageCountryController = require("../../controller/packages/packageCountry.controller");

router.get("/", packageCountryController.getPackageCountries);
router.post("/", packageCountryController.insertPackageCountry);
router.put("/:id", packageCountryController.updatePackageCountry);
router.delete("/:id", packageCountryController.deletePackageCountry);
router.get("/trashed", packageCountryController.getTrashedPackageCountries);
router.patch("/restore/:id", packageCountryController.restorePackageCountry);

module.exports = router;
