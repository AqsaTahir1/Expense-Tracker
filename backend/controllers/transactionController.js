
const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            description,
            date
        } = req.body;

        if (!title || !amount || !type || !category) {
            return res.status(400).json({
                message: "Please provide title, amount, type and category"
            });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                message: "Type must be income or expense"
            });
        }

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            title,
            amount: numericAmount,
            type,
            category,
            description: description || "",
            ...(date ? { date } : {})
        });

        res.status(201).json({
            message: "Transaction added successfully",
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add transaction",
            error: error.message
        });
    }
};

// Get All Transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id
        }).sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            count: transactions.length,
            transactions
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch transactions",
            error: error.message
        });
    }
};

// Get Single Transaction
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.status(200).json(transaction);

    } catch (error) {
        res.status(400).json({
            message: "Invalid transaction ID"
        });
    }
};

// Update Transaction
const updateTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            description,
            date
        } = req.body;

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }
            transaction.title = title.trim();
        }

        if (amount !== undefined) {
            const numericAmount = Number(amount);

            if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
                return res.status(400).json({
                    message: "Amount must be greater than zero"
                });
            }

            transaction.amount = numericAmount;
        }

        if (type !== undefined) {
            if (!["income", "expense"].includes(type)) {
                return res.status(400).json({
                    message: "Type must be income or expense"
                });
            }
            transaction.type = type;
        }

        if (category !== undefined) {
            if (typeof category !== "string" || !category.trim()) {
                return res.status(400).json({
                    message: "Category cannot be empty"
                });
            }
            transaction.category = category.trim();
        }

        if (description !== undefined) {
            transaction.description = description;
        }

        if (date !== undefined) {
            const parsedDate = new Date(date);

            if (Number.isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid transaction date"
                });
            }

            transaction.date = parsedDate;
        }

        await transaction.save();

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update transaction",
            error: error.message
        });
    }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid transaction ID"
        });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};
