
import { useEffect, useState } from "react";

function TransactionForm({
  onSubmit,
  editingTransaction,
  onCancel
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || "",
        type: editingTransaction.type || "expense",
        category: editingTransaction.category || "Food",
        description: editingTransaction.description || "",
        date: editingTransaction.date
          ? editingTransaction.date.split("T")[0]
          : new Date().toISOString().split("T")[0]
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
        description: "",
        date: new Date().toISOString().split("T")[0]
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>
        {editingTransaction
          ? "Update Transaction"
          : "Add New Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Transaction Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Salary</option>
              <option>Shopping</option>
              <option>Transport</option>
              <option>Education</option>
              <option>Health</option>
              <option>Entertainment</option>
              <option>Bills</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingTransaction
                ? "Update Transaction"
                : "Add Transaction"}
          </button>

          {editingTransaction && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
