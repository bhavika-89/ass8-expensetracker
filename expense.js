"use strict";
const expenseForm = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const expenseList = document.getElementById("expense-list");
let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function addExpense(e) {
    e.preventDefault();
    const newExpense = {
        id: Date.now(),
        amount: parseFloat(amountInput.value),
        date: dateInput.value,
        category: categoryInput.value,
        description: descriptionInput.value
    };
    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    expenseForm.reset();
}
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
}
function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.amount} - ${expense.category} - ${expense.date}
            <button onclick="deleteExpense(${expense.id})">❌</button>`;
        expenseList.appendChild(li);
    });
}
expenseForm.addEventListener("submit", addExpense);
renderExpenses();
