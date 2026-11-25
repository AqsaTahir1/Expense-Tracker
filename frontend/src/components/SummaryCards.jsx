
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = income - expenses;

  const formatAmount = (amount) =>
    amount.toLocaleString("en-PK", {
      maximumFractionDigits: 2
    });

  return (
    <div className="summary-grid">
      <div className="summary-card balance-card">
        <div>
          <p>Total Balance</p>
          <h2>Rs. {formatAmount(balance)}</h2>
        </div>
        <Wallet size={30} />
      </div>

      <div className="summary-card income-card">
        <div>
          <p>Total Income</p>
          <h2>Rs. {formatAmount(income)}</h2>
        </div>
        <TrendingUp size={30} />
      </div>

      <div className="summary-card expense-card">
        <div>
          <p>Total Expenses</p>
          <h2>Rs. {formatAmount(expenses)}</h2>
        </div>
        <TrendingDown size={30} />
      </div>
    </div>
  );
}

export default SummaryCards;
