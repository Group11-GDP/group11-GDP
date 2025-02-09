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
                    <div>Title:</div>
                    <div className="input-wrapper">
                        <input
                          type="text"
                          placeholder="Expense Name"
                          value={expenseName}
                          onChange={(e) => setExpenseName(e.target.value)}
                        />
                    </div>

                    <div>Date:</div>
                    <div className="input-wrapper">
                        <DatePicker
                          selected={expenseDate}
                          onChange={(expenseDate) => (expenseDate != null)? setExpenseDate(expenseDate) : new Date()}
                        />
                    </div>

                    <div>Category:</div>
                    <div className="input-wrapper" >
                        <select
                          key={expenseType}
                          value={expenseType}
                          
                          onChange={(e) => setExpenseType(e.target.value)}
                        >
                          <option hidden={true}>Expense type</option>
                            {types.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                        
                    <div>Notes:</div>
                    <div className="input-wrapper">
                        <textarea
                          placeholder="Notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div>Frequency:</div>
                    <div className="input-wrapper">
                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                        >
                            <option key="One time" value="One time">One time</option>
                            <option key="Daily" value="Daily">Daily</option>
                            <option key="Weekly" value="Weekly">Weekly</option>
                            <option key="Monthly" value="Monthly">Monthly</option>
                            <option key="Annually" value="Annually">Annually</option>
                        </select>
                    </div>
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