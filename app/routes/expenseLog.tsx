import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Form } from "react-router";

export default function AddExpense() {
    const [expenseName, setExpenseName] = useState("");
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseType, setExpenseType] = useState("");
    const [notes, setNotes] = useState("");
    const [frequency, setFrequency] = useState("One time");
  
    function handleSubmit() {
      //e.preventDefault();
      // Handle form submission logic here
      alert("Submitted information:\n" + 
        expenseName +", "+ expenseDate.toLocaleDateString() +", " + expenseType +", " + notes +", " + frequency);
    };

    const types = ["Groceries", "Transport", "Subscription", "Shopping", "Entertainment"];
  
    return (
      <div className="scroll-container">  
        <main className="home-container">
            <h1 className="welcome-header">Add Expense</h1>
  
            <section className="basic-info">
              <div className="basic-header">Expense Information</div>
              <div className="input-group">
                Total:
                  <input
                    type="number"
                    placeholder="€ 0"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                  />

                Date:
                  <DatePicker
                  className="input-field"
                    selected={expenseDate}
                    onChange={(expenseDate) => (expenseDate != null)? setExpenseDate(expenseDate) : new Date()}
                  />

                Category:
                  <select
                    key={expenseType}
                    value={expenseType}
                    className="input-field"
                    onChange={(e) => setExpenseType(e.target.value)}
                  >
                    <option hidden={true}>Expense type</option>
                      {types.map((type) => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                  </select>
                    
                Notes:
                  <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-field"
                  />

                Frequency:
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="input-field"
                  >
                      <option key="One time" value="One time">One time</option>
                      <option key="Daily" value="Daily">Daily</option>
                      <option key="Weekly" value="Weekly">Weekly</option>
                      <option key="Monthly" value="Monthly">Monthly</option>
                      <option key="Annually" value="Annually">Annually</option>
                  </select>
              </div>
            </section>

            <div className="button-group">
                <button type="button" className="action-button" onClick={handleSubmit}>
                    Add Expense
                </button>
            </div>
        </main>
    </div>
  );
}