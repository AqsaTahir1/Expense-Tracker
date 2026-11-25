
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionController");

// All transaction routes require authentication
router.use(protect);

router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
