
const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger");

router.get("/", logger, (req, res) => {
  res.json({ message: "Public route" });
});

module.exports = router;
