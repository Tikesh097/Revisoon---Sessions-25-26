const express = require("express");
const router = express.Router();

const verifyApiKey = require("../middleware/verifyApiKey");

const {
  getAllTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", verifyApiKey, getAllTask);
router.get("/:id", verifyApiKey, getTaskById);
router.post("/", verifyApiKey, createTask);
router.put("/:id", verifyApiKey, updateTask);
router.patch("/:id", verifyApiKey, updateTask);
router.delete("/:id", verifyApiKey, deleteTask);

module.exports = router;
