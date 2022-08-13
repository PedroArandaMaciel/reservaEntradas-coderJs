class Reserva {
    constructor(pelicula = "", cantMayor = 0, cantMenor = 0, id, precioTotal) {
        this.Pelicula = pelicula;
        this.Mayores = cantMayor;
        this.Menores = cantMenor;
        this.Id = id;
        this.PrecioTotal = precioTotal
    }
}
function suma(numero1 = 0, numero2 = 0) {
    return numero1 + numero2
}
function generarEntradaConsola(pelicula, cantMayores, precioReservaMayores, cantMenores, precioReservaMenores, precioFinal) {
    return (`\n*********PELICULA: ${pelicula}\n*\n* ADULTOS: ${cantMayores} Mayores-------->SubTotal: $${precioReservaMayores}\n* CHICOS: ${cantMenores} Menores--------->SubTotal: $${precioReservaMenores}\n*\n*                        PRECIO FINAL: $${precioFinal}\n*********************************************`)
}
function calcularEntrada(cantidadDeEntradas = 1, edad = "") {
    const PRECIOMAYOR = 900
    const PRECIOMENOR = 450
    if (edad === "mayor") {
        return PRECIOMAYOR * cantidadDeEntradas
    } else if (edad === "menor") {
        return PRECIOMENOR * cantidadDeEntradas
    }
}
function insertarHtml() {
    const divEntradas = document.getElementById("divEntradas")
    divEntradas.innerText = ""
    reservas.forEach(reserva => {
        divEntradas.innerHTML += `
        <div class="cardReserva" id="reserva${reserva.Id}">
        <p>Pelicula: ${reserva.Pelicula}</p>
        <p>Mayores: ${reserva.Mayores}</p>
        <p>Menores: ${reserva.Menores}</p>
        <p>Reserva Numero: ${reserva.Id}</p>
        <p>Precio Total: ${reserva.PrecioTotal}</p>
        <div>
        <button class="btnCancelarRes" id="btnReserva${reservas.length}">Remover Reserva</button>
        </div>
        </div>
        `
    })
}
const reservas = []
let idReserva = 1
let ultimasReservasStorage = []

if(localStorage.getItem("reservasLS")){                               
    ultimasReservasStorage = JSON.parse(localStorage.getItem("reservasLS"))
    idReserva = ultimasReservasStorage.length + 1
    ultimasReservasStorage.forEach((reserva, indice) => {
        reservas.push(reserva)                                //igualo mi array reservas con el array de ultimasReservas(storage)
        divEntradas.innerHTML += `
        <div class="cardReserva" id="reserva${indice}">
        <p>Pelicula: ${reserva.Pelicula}</p>
        <p>Mayores: ${reserva.Mayores}</p>
        <p>Menores: ${reserva.Menores}</p>
        <p>Reserva Numero: ${reserva.Id}</p>
        <p>Precio Total: ${reserva.PrecioTotal}</p>
        <div>
        <button class="btnCancelarRes" id="btnReserva${reservas.length}">Remover Reserva</button>
        </div>
        </div>
        `
    })
}
console.log(ultimasReservasStorage)
const formEntrada = document.getElementById("formEntrada")
formEntrada.addEventListener("submit", (event) => {
    event.preventDefault()
    let precioReservaMayores = 0, precioReservaMenores = 0
    let pelicula = document.getElementById("pelicula").value
    const cantMayores = parseInt(document.getElementById("mayor").value)
    const cantMenores = parseInt(document.getElementById("menor").value)
    if ((cantMayores >= 0 && cantMenores >= 0) && (cantMayores != 0 || cantMenores != 0) && (pelicula != 0)) {
        if (cantMayores > 0) {
            precioReservaMayores = calcularEntrada(cantMayores, "mayor")
        }
        if (cantMenores > 0) {
            precioReservaMenores = calcularEntrada(cantMenores, "menor")
        }
        let precioFinal = suma(precioReservaMayores, precioReservaMenores)
        const entrada = new Reserva(pelicula, cantMayores, cantMenores, idReserva, precioFinal)
        reservas.push(entrada)
        localStorage.setItem("reservasLS", JSON.stringify(reservas))      //actualiza el array reservas a medida se generan
        console.log(reservas)
        console.log(generarEntradaConsola(pelicula, cantMayores, precioReservaMayores, cantMenores, precioReservaMenores, precioFinal))
        idReserva++
        insertarHtml()
    } else {
        console.log("Cantidad no valida")
    }
    formEntrada.reset()
})