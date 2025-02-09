import { useState } from "react";

export default function IncomeLogger() {
  const [incomeName, setIncomeName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Salary");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("One time");

  const categories = ["Salary", "Freelance", "Investments", "Other"];
  const frequencies = ["One time", "Daily", "Weekly", "Monthly", "Annually"];

  return (
    <div className="income-container">
      <h1 className="income-header">Add Income</h1>

      <section className="income-info">
        <div className="income-header-bar">
          <span>Income Information</span>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Income Name"
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field"
          />
        </div>
      </section>

      <section className="income-regularity">
        <div className="income-header-bar">
          <span>Is it Regular?</span>
        </div>
        <div className="radio-group">
          {frequencies.map((freq) => (
            <label key={freq} className="radio-label">
              <input
                type="radio"
                value={freq}
                checked={frequency === freq}
                onChange={() => setFrequency(freq)}
                className="radio-input"
              />
              <span>{freq}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="button-group">
        <button className="action-button">Add Income</button>
      </div>
    </div>
  );
}