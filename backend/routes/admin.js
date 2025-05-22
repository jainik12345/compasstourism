const router = require("express").Router();

const controller = require("../controller/admin.controller");

router.route("/").get(controller.getadmin).post(controller.postadmin);
router.post("/login", controller.loginAdmin);
router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);
router.post("/reset-password", controller.resetPassword);

module.exports = router;
