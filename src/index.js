/*
 * Variables
 * */
const formulario = document.getElementById("agregar-gasto");
const gastoListado = document.querySelector(".list-group"); // HTML dinamico
let presupuesto; // Se usa en preguntarPresupuesto()

/*
 * Eventos
 * */
eventListeners();
function eventListeners() {
  // Dispara los event listeners
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}

/*
 * Clases
 * */
class Presupuesto {
  // Crea presupuesto, restante y gastos
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto); // Transforma a numero el presupuestoUsuario (prompt)
    this.restante = Number(presupuesto); // Restante al inicio es lo mismo que presupuesto
    this.gastos = [];
  }
}

class UserInterface {
  // Muestra HTML necesario
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad; // Se extrae lo que se va a mostrar en el HTML
    document.getElementById("total").textContent = presupuesto; // se muestra en el HTML
    document.getElementById("restante").textContent = restante;
  }
}

/*
 * Instancias de clases
 * */
const userInterface = new UserInterface();

/*
 * Funciones
 * */
function preguntarPresupuesto() {
  // Muestra prompt y valida el resultado
  const presupuestoUsuario = prompt("What is your weekly budget?");

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario); // Pasa presupuesto de prompt a la clase Presupuesto
  userInterface.insertarPresupuesto(presupuesto); // Pasa el obj completo de Presupuesto{}
}
