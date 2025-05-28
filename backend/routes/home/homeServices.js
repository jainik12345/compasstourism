const router = require("express").Router();
const controller = require("../../controller/home/homeServices.controller");

router.get("/", controller.getHomeServices);
router.post("/", controller.saveHomeServices);

module.exports = router;
