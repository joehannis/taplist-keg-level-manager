const express = require("express");
const router = express.Router();
const tapsController = require("../controllers/tapsController");

router.get("/taps", tapsController);

module.exports = router;
