const form = document.getElementById("agregar-gasto");
const listGroup = document.querySelector(".list-group");
let budgetAmount;

document.addEventListener("DOMContentLoaded", function () {
  const budgetUser = prompt("What is your weekly budget");

  budgetUser === "" ||
  budgetUser === null ||
  isNaN(budgetUser) ||
  budgetUser <= 0
    ? window.location.reload()
    : console.log(true);
});

class Budget {
  constructor(budget) {
    this.budget = Number(budget); // transform prompt value into Number
    this.remaining = Number(budget);
  }

  budgetRemaining(amount = 0) {
    return (this.remaining -= Number(amount));
  }
}

class Inteface {
  insertBudget(amount) {
    const budgetSpan = document.querySelector("span#total");
    const remainingSpan = document.querySelector("span#restante");

    budgetSpan.innerHTML = `${amount}`;
    remainingSpan.innerHTML = `${amount}`;
  }
}
