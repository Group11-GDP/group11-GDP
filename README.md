# Income & Expense Tracker
A simple **Income & Expense Tracker** built with **React (Frontend) & Flask (Backend)**.  
It allows users to **add income, add expenses, view financial summary, and export data as CSV**.  
Data is stored **persistently** in an **SQLite database (`finance.db`)**.

---

## **Features**
✅ Add & Track Income  
✅ Add & Track Expenses  
✅ View Total Income, Expenses, & Savings  
✅ React Router for Navigation  
✅ Export Transactions as CSV  
✅ Fast API using Flask  
✅ SQLite Database (Persistent Storage)  

---

## **Technologies Used**
### **Frontend (React + Vite)**
- **React 19**
- **React Router**
- **Axios (for API calls)**
- **Vite (for fast development)**

### **Backend (Flask)**
- **Flask (Python)**
- **Flask CORS** (for frontend-backend communication)
- **Flask SQLAlchemy** (Database ORM)
- **SQLite** (Persistent Data Storage)

---

## **Backend Setup (Flask)**
### **Install Dependencies**
Ensure you have **Python 3.8+** installed, then run:

cd backend  
pip install -r requirements.txt  
python app.py  

The Flask backend should now be running at:
http://127.0.0.1:5000

---

## **Frontend Setup**
### **Install Dependencies**
Ensure Node.js 20+ is installed, then run:

npm install  
npm run dev

---

## **The API Endpoints(Backend)**
Endpoint	    Method	Description
/income	        POST	Add new income
/expense	    POST	Add new expense
/income	        GET	    Retrieve all income entries
/expense	    GET	    Retrieve all expense entries
/transactions	GET	    Fetch both income & expense transactions
/summary	    GET	    Fetch total income, expenses, and savings

---

## **Usage Guide**
1️⃣ Open http://localhost:5173 in your browser.
2️⃣ Click "Add Income" → Enter details & submit.
3️⃣ Click "Add Expense" → Enter details & submit.
4️⃣ Check the Total Income, Total Expenses, and Savings on the Home Page.
5️⃣ Click "Export Summary" to download a CSV file of all transactions.

## **To remove, or reset data delete finance.db (inside the backend folder) and restart the flask server.**
rm finance.db  
python app.py
