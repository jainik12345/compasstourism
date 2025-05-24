const router = require("express").Router();
const homeTestimonialController = require("../../controller/home/homeTestimonial.controller");

router
  .route("/")
  .get(homeTestimonialController.getHomeTestimonials)
  .post(homeTestimonialController.insertHomeTestimonial);

router.put("/update/:id", homeTestimonialController.updateHomeTestimonial);
router.delete("/delete/:id", homeTestimonialController.deleteHomeTestimonial);
router.get("/trashed", homeTestimonialController.getTrashedHomeTestimonials);
router.patch("/restore/:id", homeTestimonialController.restoreHomeTestimonial);

module.exports = router;
