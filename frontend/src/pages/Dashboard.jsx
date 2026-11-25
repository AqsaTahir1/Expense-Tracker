
import { useCallback, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import MonthlySummary from "../components/MonthlySummary";
import { useNavigate } from "react-router-dom";
import { LogOut, Wallet } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setError("");
      const response = await api.get("/transactions");

      setTransactions(response.data.transactions || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load transactions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSaveTransaction = async (formData) => {
    try {
      setError("");
      setSuccess("");

      if (editingTransaction) {
        await api.put(
          `/transactions/${editingTransaction._id}`,
          formData
        );

        setSuccess("Transaction updated successfully!");
        setEditingTransaction(null);
      } else {
        await api.post("/transactions", formData);

        setSuccess("Transaction added successfully!");
      }

      await fetchTransactions();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to save transaction.";

      setError(message);
     
    }
  };

  const handleDeleteTransaction = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/transactions/${id}`);

      setSuccess("Transaction deleted successfully!");

      if (editingTransaction?._id === id) {
        setEditingTransaction(null);
      }

      await fetchTransactions();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete transaction."
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="brand">
          <Wallet size={30} />
          <div>
            <h2>Expense Tracker</h2>
            <span>Personal Finance Manager</span>
          </div>
        </div>

        <div className="user-section">
          <span>
            Welcome, {user?.name || "User"}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <div>
            <h1>Dashboard</h1>
            <p>Track and manage your money in one place.</p>
          </div>
        </div>

        {error && (
          <div className="alert error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="alert success-message">
            {success}
          </div>
        )}

        {loading ? (
          <p className="loading-message">
            Loading your transactions...
          </p>
        ) : (
          <>
            <SummaryCards transactions={transactions} />
            <MonthlySummary transactions={transactions} />

            <TransactionForm
              onSubmit={handleSaveTransaction}
              editingTransaction={editingTransaction}
              onCancel={() => setEditingTransaction(null)}
            />

            <ExpenseChart transactions={transactions} />

            <TransactionList
              transactions={transactions}
              onEdit={setEditingTransaction}
              onDelete={handleDeleteTransaction}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
