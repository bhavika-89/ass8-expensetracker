interface Expense {
    id: number;
    amount: number;
    date: string;
    category: string;
    description: string;
}

const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const expenseList = document.getElementById("expense-list") as HTMLUListElement;

let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(e: Event) {
    e.preventDefault();

    const newExpense: Expense = {
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

function deleteExpense(id: number) {
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