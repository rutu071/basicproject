let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const transactionTableBody = document.getElementById('transaction-table-body');
const totalIncomeCell = document.getElementById('total-income');
const totalExpensesCell = document.getElementById('total-expenses');
const netIncomeCell = document.getElementById('net-income');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const type = document.getElementById('type').value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const transaction = { type, category, amount, date };
    transactions.push(transaction);

    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    updateTotals();

    const newRow = transactionTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = transaction.category;
    amountCell.textContent = transaction.amount;
    dateCell.textContent = transaction.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = transactions.indexOf(transaction);
        if (index > -1) {
            if (transactions[index].type === 'income') {
                totalIncome -= transactions[index].amount;
            } else {
                totalExpenses -= transactions[index].amount;
            }

            transactions.splice(index, 1);
            updateTotals();
            transactionTableBody.removeChild(newRow);
        }
    });
    deleteCell.appendChild(deleteBtn);
});

function updateTotals() {
    totalIncomeCell.textContent = totalIncome.toFixed(2);
    totalExpensesCell.textContent = totalExpenses.toFixed(2);
    netIncomeCell.textContent = (totalIncome - totalExpenses).toFixed(2);
}
