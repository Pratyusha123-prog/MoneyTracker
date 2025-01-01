let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (date === '') {
        alert('Please select a date.');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    if (category === 'Expense'||category==='Food'||category==='College Fee'||category==='Rent'||category==='Shopping'||category==='Cool Drinks') {
        totalAmount -= amount;
    } else {
        totalAmount += amount;
    }

    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(expense), 1);

        if (expense.category === 'Expense') {
            totalAmount += expense.amount;
        } else {
            totalAmount -= expense.amount;
        }

        totalAmountCell.textContent = totalAmount;
        expenseTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);

    // Clear input fields after adding
    amountInput.value = '';
    dateInput.value = '';
});
