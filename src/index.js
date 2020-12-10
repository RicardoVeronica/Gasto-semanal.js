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
  formulario.addEventListener("submit", agregarGasto);
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
    // Mustra cantidad de presupuesto y restante en HTML
    const { presupuesto, restante } = cantidad; // Se extrae lo que se va a mostrar en el HTML
    document.getElementById("total").textContent = presupuesto; // se muestra en el HTML
    document.getElementById("restante").textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    // Muesta alerta sobre validacion de formulario
    const div = document.createElement("div");
    div.classList.add("text-center", "alert"); // Clases de bootstrap
    div.textContent = mensaje;

    // Si el tipo de mensaje es error muestra una clase sino muestra otra
    tipo === "error"
      ? div.classList.add("alert-danger")
      : div.classList.add("alert-success");

    // Inserta div con mensaje y clases antes del form
    document.querySelector(".primario").insertBefore(div, formulario);

    // Al pasar 2.5 seg se borra el div del mensaje
    setTimeout(() => {
      div.remove();
    }, 2500);
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

function agregarGasto(e) {
  // Lee inputs de formulario y valida
  e.preventDefault();

  const nombre = document.getElementById("gasto").value;
  const cantidad = document.getElementById("cantidad").value;

  if (nombre === "" || cantidad === "") {
    userInterface.imprimirAlerta("Todos los campos son obligatorios", "error");
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    userInterface.imprimirAlerta("La cantidad no es valida", "error");
  }
}
