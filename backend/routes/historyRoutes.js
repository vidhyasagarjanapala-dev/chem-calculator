const express = require("express");
const {
  saveHistory,
  getHistory,
  deleteHistory,
  clearHistory
} = require("../controllers/historycontroller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveHistory);
router.get("/", authMiddleware, getHistory);
router.delete("/:id", authMiddleware, deleteHistory);
router.delete("/", authMiddleware, clearHistory);

module.exports = router;