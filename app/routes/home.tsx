import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import AddExpenseIcon from "../icons/AddExpense.svg";
import AddIncomeIcon from "../icons/AddIncome.svg";
import ViewExpensesIcon from "../icons/ViewExpenses.svg";
import ExportSummaryIcon from "../icons/ExportSummary.svg";

import "./home.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [70000, 30000],
        backgroundColor: ["#62B2FD", "#9BDFC4"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="home-container">
      {/* Doughnut Chart */}
      <div className="chart-container">
        <Doughnut data={chartData} />

        <div className="chart-text">
          <h2>Monthly Overview</h2>
          <p>€40,000.00 saved</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#62B2FD" }}></span>
          <span className="category-name">Income</span>
          <span className="category-value">€70,000.00</span>
        </div>
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#9BDFC4" }}></span>
          <span className="category-name">Expenses</span>
          <span className="category-value">€30,000.00</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-grid">
        {/* Add Expense */}
        <button onClick={() => navigate("/expense")} className="grid-button">
          <img src={AddExpenseIcon} alt="Add Expense" className="button-icon" />
          <p>Add Expense</p>
        </button>

        {/* Add Income */}
        <button onClick={() => navigate("/income")} className="grid-button">
          <img src={AddIncomeIcon} alt="Add Income" className="button-icon" />
          <p>Add Income</p>
        </button>

        {/* View Expenses */}
        <button onClick={() => navigate("/expenses")} className="grid-button notification">
          <img src={ViewExpensesIcon} alt="View Expenses" className="button-icon" />
          <p>View Expenses</p>
          {/* Notification Badge */}
          <span className="badge">3</span>
        </button>

        {/* Export Summary */}
        <button onClick={() => navigate("/summary")} className="grid-button">
          <img src={ExportSummaryIcon} alt="Export Summary" className="button-icon" />
          <p>Export Summary</p>
        </button>
    </div>
    </div>
  );
}
