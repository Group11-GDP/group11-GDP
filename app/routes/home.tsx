import React from "react";
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

// Variables to be updated with dynamic user data
const totalMonthlyIncome = 70000;
const totalMonthlyExpenses = 40000;
const totalMonthlySavings = totalMonthlyIncome - totalMonthlyExpenses;

export default function Home() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalMonthlyIncome, totalMonthlyExpenses],
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
        cutout: "60%" as const,
        plugins: {
          legend: {
            display: true,
            position: "top" as const,
          },
          tooltip: {
            callbacks: {
          label: (tooltipItem: any) => {
            let dataset = tooltipItem.dataset as { data: number[] };
            let total = dataset.data.reduce((acc: number, val: number) => acc + val, 0);
            let value = dataset.data[tooltipItem.dataIndex];
            let percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${tooltipItem.label}: €${value.toLocaleString()} (${percentage})`;
          },
            },
          },
          datalabels: {
            color: "#fff",
            font: { size: 14.5, weight: "bold" as const },
            anchor: "center" as const,
            align: "center" as const,
            formatter: (value: number, context: any) => {
          let total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
          return ((value / total) * 100).toFixed(1) + "%";
            },
          },
        },
          }}
        />
        <div className="chart-text">
          <h2>Monthly Overview</h2>
          <p>€{totalMonthlySavings.toLocaleString()} saved</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#62B2FD" }}></span>
          <span className="category-name">Income</span>
          <span className="category-value">€{totalMonthlyIncome.toLocaleString()}</span>
        </div>
        <div className="category-item">
          <span className="category-dot" style={{ backgroundColor: "#9BDFC4" }}></span>
          <span className="category-name">Expenses</span>
          <span className="category-value">€{totalMonthlyExpenses.toLocaleString()}</span>
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
