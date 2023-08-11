const express = require("express");
const router = express.Router();
const servedController = require("../controllers/servedController");

router.patch("/", servedController);

module.exports = router;
