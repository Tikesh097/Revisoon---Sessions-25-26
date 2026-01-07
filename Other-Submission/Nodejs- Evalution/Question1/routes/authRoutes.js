const express = require("express");
const router = express.Router();

const { generateApiKey } = require("../controllers/authController");

router.post("/generate-Key", generateApiKey);

module.exports = router;
