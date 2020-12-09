const form = document.getElementById("agregar-gasto");
const listGroup = document.querySelector(".list-group"); // html dinamico
let userAmount;

document.addEventListener("DOMContentLoaded", function () {
  const budgetUser = prompt("What is your weekly budget");

  if (
    budgetUser === "" ||
    budgetUser === null ||
    isNaN(budgetUser) ||
    budgetUser <= 0
  ) {
    window.location.reload();
  }

  userAmount = new BudgetClass(budgetUser);
  userInterface.insertBudget(userAmount);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const expenseName = document.getElementById("gasto").value;
  const expenseAmount = Number(document.getElementById("cantidad").value);

  if (expenseName === "" || expenseAmount === "") {
    userInterface.printAlert("Ambos campos son obligatorios", "error");
    return;
  } else if (expenseAmount <= 0 || isNaN(expenseAmount)) {
    userInterface.printAlert("Cantidad no valida", "error");
    return;
  }

  // Genera objeto con los datos validados
  const userExpense = { expenseName, expenseAmount, id: Date.now() }; // object literal enhancement

  userAmount.newExpense(userExpense); // Adds new expense in array
  userInterface.printAlert("Gasto agregado correctamente", "succes"); // send message ok

  const { expenses } = userAmount;
  userInterface.printExpenses(expenses); // print expenses in html

  form.reset();
});

class BudgetClass {
  // Crea presupuesto, restante y gastos
  constructor(budget) {
    this.budget = Number(budget);
    this.remaining = Number(budget);
    this.expenses = [];
  }

  newExpense(userExpense) {
    this.expenses = [...this.expenses, userExpense];
  }
}

class UserInterface {
  // Inserta el presupuesto y el restante en el html
  insertBudget(amountInterface) {
    const { budget, remaining } = amountInterface;

    document.getElementById("total").textContent = budget;
    document.getElementById("restante").textContent = remaining;
  }

  cleanHTML() {
    // Clean listGroup
    while (listGroup.firstChild) {
      listGroup.removeChild(listGroup.firstChild);
    }
  }

  printAlert(msg, type) {
    const div = document.createElement("div");
    div.classList.add("text-center", "alert");

    type === "error"
      ? div.classList.add("alert-danger")
      : div.classList.add("alert-success");

    div.textContent = msg;
    document.querySelector(".primario").insertBefore(div, form);

    setTimeout(() => {
      div.remove();
    }, 2500);
  }

  printExpenses(expenses) {
    this.cleanHTML();

    expenses.forEach((expense) => {
      const { expenseAmount, expenseName, id } = expense;

      const li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      // li.setAttribute("data-id", id); // old way
      li.dataset.id = id; // new way
      li.innerHTML = `${expenseName} <span class="badge badge-primary badge-pill">$${expenseAmount}</span>`;

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn", "btn-danger", "borrar-gasto");
      btnDelete.textContent = "borrar";

      li.appendChild(btnDelete);

      listGroup.appendChild(li);
    });
  }
}

const userInterface = new UserInterface();
