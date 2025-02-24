import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";

import AddExpenseIcon from "../icons/AddExpense.svg";
import AddIncomeIcon from "../icons/AddIncome.svg";
import ViewExpensesIcon from "../icons/ViewExpenses.svg";
import ExportSummaryIcon from "../icons/ExportSummary.svg";

import "../styles/home.css";

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

  return (
    <div className="home-container">
      {/* Doughnut Chart (Fixed Size) */}
      <div className="home-chart-container">
        <div className="home-chart-wrapper">
          <Doughnut
            data={{
              labels: ["Income", "Expenses"],
              datasets: [{ data: [summary.total_income, summary.total_expense], backgroundColor: ["#62B2FD", "#9BDFC4"] }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Prevents automatic resizing
              cutout: "60%",
              plugins: {
                legend: { display: true, position: "top" },
                datalabels: { color: "#fff", font: { size: 14.5, weight: "bold" }, anchor: "center", align: "center" },
              },
            }}
          />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="home-category-breakdown">
        <div className="home-category-item">
          <span className="home-category-dot" style={{ backgroundColor: "#62B2FD" }}></span>
          <span className="home-category-name">Income</span>
          <span className="home-category-value">€{summary.total_income?.toLocaleString() || "0"}</span>
        </div>
        <div className="home-category-item">
          <span className="home-category-dot" style={{ backgroundColor: "#9BDFC4" }}></span>
          <span className="home-category-name">Expenses</span>
          <span className="home-category-value">€{summary.total_expense?.toLocaleString() || "0"}</span>
        </div>
      </div>

      {/* Button Grid */}
      <div className="home-button-grid">
        <button onClick={() => navigate("/expense")} className="home-grid-button">
          <img src={AddExpenseIcon} alt="Add Expense" className="home-button-icon" />
          <p>Add Expense</p>
        </button>

        <button onClick={() => navigate("/income")} className="home-grid-button">
          <img src={AddIncomeIcon} alt="Add Income" className="home-button-icon" />
          <p>Add Income</p>
        </button>

        <button onClick={() => navigate("/expenses")} className="home-grid-button home-notification">
          <img src={ViewExpensesIcon} alt="View Expenses" className="home-button-icon" />
          <p>View Expenses</p>
        </button>

        <button onClick={handleExportCSV} className="home-grid-button">
          <img src={ExportSummaryIcon} alt="Export Summary" className="home-button-icon" />
          <p>Export Summary</p>
        </button>
      </div>
    </div>
  );
}
