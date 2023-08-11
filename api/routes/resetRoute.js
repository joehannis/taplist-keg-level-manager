const express = require("express");
const router = express.Router();
const resetController = require("../controllers/resetController");

router.patch("/", resetController);

module.exports = router;
