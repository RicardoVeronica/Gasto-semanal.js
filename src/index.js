const budgetUser = prompt('What is your weekly budget')
let budgetAmount


class Budget {
  constructor(budget) {
    this.budget = Number(budget) // transform prompt value into Number
    this.remaining = Number(budget)
  }

  budgetRemaining(amount = 0) { // default = 0
    return this.remaining -= Number(amount)
  }
}


class Inteface {
  insertBudget(amount) {
    const budgetSpan = document.querySelector('span#total')
    const remainingSpan = document.querySelector('span#restante')

    budgetSpan.innerHTML = `${amount}`
    remainingSpan.innerHTML = `${amount}`
  }
}


document.addEventListener('DOMContentLoaded', function() {
  if (budgetUser === null || budgetUser === '') {
    window.location.reload() // location = host
  } else {
    budgetAmount = new Budget(budgetUser)
    const ui = new Inteface()
    ui.insertBudget(budgetAmount.budget)
  }
})
