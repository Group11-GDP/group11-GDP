from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from mindee import Client, PredictResponse, product
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)  
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(200), nullable=True)
    frequency = db.Column(db.String(20), nullable=False)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(200), nullable=True)
    frequency = db.Column(db.String(20), nullable=False)

# Create Database
with app.app_context():
    db.create_all()
    
@app.route('/transactions', methods=['GET'])
def get_transactions():
    income = Income.query.all()
    expenses = Expense.query.all()

    transactions = [
        {"category": inc.category, "amount": inc.amount, "type": "Income", "date": inc.date, "notes": inc.notes} for inc in income
    ] + [
        {"category": exp.category, "amount": exp.amount, "type": "Expense", "date": exp.date, "notes": exp.notes} for exp in expenses
    ]
    return jsonify(transactions)

# Routes
@app.route('/income', methods=['POST'])
def add_income():
    data = request.json
    new_income = Income(
        amount=data['amount'],
        date=data['date'],
        category=data['category'],
        notes=data.get('notes', ''),
        frequency=data['frequency']
    )
    db.session.add(new_income)
    db.session.commit()
    return jsonify({'message': 'Income added successfully'}), 201

@app.route('/expense', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = Expense(
        amount=data['amount'],
        date=data['date'],
        category=data['category'],
        notes=data.get('notes', ''),
        frequency=data['frequency']
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'}), 201

@app.route('/income', methods=['GET'])
def get_income():
    incomes = Income.query.all()
    income_list = [{'id': inc.id, 'amount': inc.amount, 'date': inc.date, 'category': inc.category, 'notes': inc.notes, 'frequency': inc.frequency} for inc in incomes]
    return jsonify(income_list)

@app.route('/expense', methods=['GET'])
def get_expense():
    expenses = Expense.query.all()
    expense_list = [{'id': exp.id, 'amount': exp.amount, 'date': exp.date, 'category': exp.category, 'notes': exp.notes, 'frequency': exp.frequency} for exp in expenses]
    return jsonify(expense_list)

@app.route('/summary', methods=['GET'])
def summary():
    total_income = db.session.query(db.func.sum(Income.amount)).scalar() or 0
    total_expense = db.session.query(db.func.sum(Expense.amount)).scalar() or 0
    savings = total_income - total_expense
    return jsonify({'total_income': total_income, 'total_expense': total_expense, 'savings': savings})


@app.route('/uploadReceipt', methods=['POST'])
def upload_receipt():
    if 'receipts' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['receipts']
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Sanitize the filename and save it to the "receipt" folder
    filename = secure_filename(file.filename)
    file_path = os.path.join("receipt", filename)
    file.save(file_path)

    try:
        # Process the file using Mindee
        mindee_client = Client(api_key="c0d20a68372d7cb7ce9111cdecc41d7c")
        input_doc = mindee_client.source_from_path(file_path)
        result: PredictResponse = mindee_client.parse(product.ReceiptV5, input_doc)

        print(result.document)
        return jsonify({
            "message": "Receipt processed successfully",
            "document": str(result.document)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
