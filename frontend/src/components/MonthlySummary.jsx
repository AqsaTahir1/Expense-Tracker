
function MonthlySummary({ transactions }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((item) => {
    const date = new Date(item.date);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const income = monthlyTransactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expenses = monthlyTransactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  return (
    <div className="monthly-summary">
      <h2>This Month's Summary</h2>

      <div className="monthly-grid">
        <div>
          <span>Monthly Income</span>
          <h3>Rs. {income.toLocaleString()}</h3>
        </div>

        <div>
          <span>Monthly Expenses</span>
          <h3>Rs. {expenses.toLocaleString()}</h3>
        </div>

        <div>
          <span>Monthly Savings</span>
          <h3>Rs. {(income - expenses).toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummary;
