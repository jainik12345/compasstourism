const express = require("express");
const router = express.Router();
const controller = require("../../controller/about/aboutConsultation.controller");

router.get("/", controller.getAboutConsultation);
router.post("/", controller.insertAboutConsultation);
router.put("/", controller.updateAboutConsultation);

module.exports = router;
