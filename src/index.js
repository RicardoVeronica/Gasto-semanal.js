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

  nuevoGasto(gasto) {
    // Agrega nuevo gasto de agregarGasto()
    this.gastos = [...this.gastos, gasto]; // Saca agrega obj gasto a array gastos
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

  agregarGastoListado(gastos) {
    // Elimina los gastos duplicados por el appendChild
    this.limpiarHTML();

    // Agrega lista de gastos al HTML iterando cada uno
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      // Crea li con contenido, clases y data attribute como id
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;
      nuevoGasto.innerHTML = `
        ${nombre} <span class="badge badge-primary badge-pill">$${cantidad}</span>
      `;

      // Crea boton para borrar gasto
      const btnBorrar = document.createElement("button");
      btnBorrar.className = "btn btn-danger borrar-gasto";
      btnBorrar.textContent = "Eliminar";

      nuevoGasto.appendChild(btnBorrar);
      gastoListado.appendChild(nuevoGasto); // appendChild no borra los registros previos
    });
  }

  limpiarHTML() {
    // Elimina los gastos duplicados por appendChild
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
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
  const cantidad = Number(document.getElementById("cantidad").value);

  if (nombre === "" || cantidad === "") {
    userInterface.imprimirAlerta("Todos los campos son obligatorios", "error");
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    userInterface.imprimirAlerta("La cantidad no es valida", "error");
  }

  // Crea objeto literal del gasto con id para eliminar
  const gasto = { nombre, cantidad, id: Date.now() }; // obj literal enhancement

  presupuesto.nuevoGasto(gasto); // Pasamos el obj gasto al array gastos de clase Presupuesto{}

  userInterface.imprimirAlerta("Gasto agregado correctamente"); // Agrega alerta que no es error

  const { gastos } = presupuesto; // Array de gastos del obj Presupuesto
  userInterface.agregarGastoListado(gastos); // Metodo que agrega al HTML los gastos

  formulario.reset(); // Limpiar el formulario despues de agregar nuevo gasto y mostrar alerta
}
