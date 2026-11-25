
import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";

function TransactionList({ transactions, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const query = search.toLowerCase();

    const matchesSearch =
      transaction.title.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query) ||
      transaction.type.toLowerCase().includes(query);

    const matchesFilter =
      filter === "all" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="table-card">
      <div className="section-heading">
        <h2>Recent Transactions</h2>
        <span>{filteredTransactions.length} records</span>
      </div>

      <div className="transaction-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty-message">
          No matching transactions found.
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td><strong>{transaction.title}</strong></td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`type-badge ${transaction.type}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={transaction.type}>
                    {transaction.type === "income" ? "+" : "-"}
                    Rs. {Number(transaction.amount).toLocaleString()}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(transaction)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => onDelete(transaction._id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
