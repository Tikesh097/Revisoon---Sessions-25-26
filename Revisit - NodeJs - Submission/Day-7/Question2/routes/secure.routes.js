const express = require("express");
const router = express.Router();

const logger = require("../middlewares/logger");
const auth = require("../middlewares/auth");
const requestTimer = require("../middlewares/requestTimer");

router.get(
  "/",
  logger,
  requestTimer,
  auth,
  (req, res) => {
    res.json({ message: "Secure route" });
  }
);

module.exports = router;
