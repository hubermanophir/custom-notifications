const router = require("express").Router();
const { initNotification } = require("../../controllers/userControllers");

router.post("/init", initNotification);
// router.post("/notification", )

module.exports = router;
