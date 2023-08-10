const express = require("express");
const router = express.Router();
const tapsController = require("../controllers/tapsController");

router.get("/", tapsController);

module.exports = router;
