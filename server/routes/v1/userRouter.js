const router = require("express").Router();
const { initNotification } = require("../../controllers/userControllers");

router.get("/init", initNotification);

module.exports = router;
