const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.createAuth);
router.get("/", authController.getAuth);

module.exports = router;
