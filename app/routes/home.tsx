import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";

import AddExpenseIcon from "../icons/AddExpense.svg";
import AddIncomeIcon from "../icons/AddIncome.svg";
import ViewExpensesIcon from "../icons/ViewExpenses.svg";
import ExportSummaryIcon from "../icons/ExportSummary.svg";

import "./home.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Home() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, savings: 0 });

  const [transactions, setTransactions] = useState<
    { category: string; amount: number; type: string; date: string; frequency: string; notes?: string }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:5000/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));

    fetch("http://localhost:5000/transactions") // ✅ Fetch income and expense data
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Category", "Amount (€)", "Type", "Date", "Frequency", "Notes"];

    const csvRows = transactions.map((transaction) =>
      [
        transaction.category,
        transaction.amount,
        transaction.type,
        `"${transaction.date}"`,
        transaction.frequency || "One-time",
        transaction.notes || "",
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Expense_Tracker_Summary.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [summary.total_income, summary.total_expense],
        backgroundColor: ["#62B2FD", "#9BDFC4"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="home-container">
      {/* Doughnut Chart */}
      <div className="chart-container">
        <Doughnut
          data={chartData}
          options={{
            cutout: "60%",
            plugins: {
              legend: { display: true, position: "top" },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    let dataset = tooltipItem.dataset as { data: number[] };
                    let total = dataset.data.reduce((acc, val) => acc + val, 0) || 1;
                    let value = dataset.data[tooltipItem.dataIndex] || 0;
                    let percentage = ((value / total) * 100).toFixed(2) + "%";
                    return `${tooltipItem.label}: €${value.toLocaleString()} (${percentage})`;
                  },
                },
              },
              datalabels: {
                color: "#fff",
                font: { size: 14.5, weight: "bold" },
                anchor: "center",
                align: "center",
                formatter: (value, context) => {
                  let total = (context.dataset.data as number[]).reduce((acc, val) => acc + val, 0) || 1;
                  return ((Number(value) / Number(total)) * 100).toFixed(1) + "%";
                },
              },
            },
          }}
        />
        <div className="chart-text">
          <h2>Monthly Overview</h2>
          <p>€{summary.savings?.toLocaleString() || "0"} saved</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#62B2FD" }}></span>
          <span className="category-name">Income</span>
          <span className="category-value">€{summary.total_income?.toLocaleString() || "0"}</span>
        </div>
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#9BDFC4" }}></span>
          <span className="category-name">Expenses</span>
          <span className="category-value">€{summary.total_expense?.toLocaleString() || "0"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-grid">
        <button onClick={() => navigate("/expense")} className="grid-button">
          <img src={AddExpenseIcon} alt="Add Expense" className="button-icon" />
          <p>Add Expense</p>
        </button>

        <button onClick={() => navigate("/income")} className="grid-button">
          <img src={AddIncomeIcon} alt="Add Income" className="button-icon" />
          <p>Add Income</p>
        </button>

        <button onClick={() => navigate("/expenses")} className="grid-button notification">
          <img src={ViewExpensesIcon} alt="View Expenses" className="button-icon" />
          <p>View Expenses</p>
          <span className="badge">3</span>
        </button>

        {/* ✅ Export Summary Button */}
        <button onClick={handleExportCSV} className="grid-button">
          <img src={ExportSummaryIcon} alt="Export Summary" className="button-icon" />
          <p>Export Summary</p>
        </button>
      </div>
    </div>
  );
}
