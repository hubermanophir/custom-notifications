const router = require("express").Router();
const {
  initNotification,
  clickNotification,
} = require("../../controllers/userControllers");

router.post("/init", initNotification);
router.post("/notification", clickNotification);

module.exports = router;
