
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#f97316"
];

function ExpenseChart({ transactions }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const barData = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: expenses }
  ];

  const categoryTotals = {};

  transactions
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0) +
        Number(item.amount);
    });

  const pieData = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value
    })
  );

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h2>Income vs Expenses</h2>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Expense Categories</h2>

        {pieData.length === 0 ? (
          <p className="empty-message">
            Add expenses to see category statistics.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ExpenseChart;
