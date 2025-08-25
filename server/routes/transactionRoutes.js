const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, addTransaction);

module.exports = router;
