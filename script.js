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
//function generarEntradaConsola(pelicula, cantMayores, precioReservaMayores, cantMenores, precioReservaMenores, precioFinal) {
//    return (`\n*********PELICULA: ${pelicula}\n*\n* ADULTOS: ${cantMayores} Mayores-------->SubTotal: $${precioReservaMayores}\n* CHICOS: ${cantMenores} Menores--------->SubTotal: $${precioReservaMenores}\n*\n*                        PRECIO FINAL: $${precioFinal}\n*********************************************`)
//}
function calcularEntrada(cantidadDeEntradas = 1, edad = "") {
    const PRECIOMAYOR = 900
    const PRECIOMENOR = 450
    let valor = (edad === "mayor") ? PRECIOMAYOR * cantidadDeEntradas : (edad === "menor") ? PRECIOMENOR * cantidadDeEntradas : 0
    return valor
}
function pintarNumeroCarrito(cantidadReservas) {
    const numeroCarrito = document.getElementById("spanCantCarrito")
    numeroCarrito.innerHTML = `
    <span class="badge bg-primary rounded-pill">${cantidadReservas}</span>
    `
}
function pintarEstructuraEntrada(reserva) {
    divEntradas.innerHTML += `
    <div class="card border-success mb-3">
    <div class="card-header bg-transparent border-success">Reserva numero ${reserva.Id}</div>
    <div class="card-body text-success">
      <h5 class="card-title">${reserva.Pelicula}</h5>
      <p class="card-text">Mayores: ${reserva.Mayores}</p>
      <p class="card-text">Menores: ${reserva.Menores}</p>
      <p class="card-text">Precio Total: $${reserva.PrecioTotal}</p>
    </div>
    <button class="btn btn-primary">Remover Seleccion</button>
    `
}
function pintarCarrito() {
    const divEntradas = document.getElementById("divEntradas")
    divEntradas.innerText = ""
    reservas.forEach(reserva => {
        pintarEstructuraEntrada(reserva)
    })
}
const reservas = []
let idReserva = 1
let ultimasReservasStorage = []

if(localStorage.getItem("reservasLS")){                             
    ultimasReservasStorage = JSON.parse(localStorage.getItem("reservasLS"))
    idReserva = ultimasReservasStorage.length + 1
    pintarNumeroCarrito(ultimasReservasStorage.length)
    ultimasReservasStorage.forEach((reserva) => {
        reservas.push(reserva)                                //igualo mi array reservas con el array de ultimasReservas(storage)
        pintarEstructuraEntrada(reserva)
    })
}
//console.log(ultimasReservasStorage) //borrar log de prueba
const formEntrada = document.getElementById("formEntrada")
formEntrada.addEventListener("submit", (event) => {
    event.preventDefault()
    let precioReservaMayores = 0, precioReservaMenores = 0
    let pelicula = document.getElementById("pelicula").value
    const cantMayores = parseInt(document.getElementById("mayor").value)
    const cantMenores = parseInt(document.getElementById("menor").value)
    if ((cantMayores >= 0 && cantMenores >= 0) && (cantMayores != 0 || cantMenores != 0) && (pelicula != 0)) {
        precioReservaMayores = (cantMayores > 0) ? calcularEntrada(cantMayores, "mayor") : 0
        precioReservaMenores = (cantMenores > 0) ? calcularEntrada(cantMenores, "menor") : 0
        let precioFinal = suma(precioReservaMayores, precioReservaMenores)
        const entrada = new Reserva(pelicula, cantMayores, cantMenores, idReserva, precioFinal)
        reservas.push(entrada)
        localStorage.setItem("reservasLS", JSON.stringify(reservas))      //actualiza el array reservas a medida se generan
        //console.log(reservas)
        //console.log(generarEntradaConsola(pelicula, cantMayores, precioReservaMayores, cantMenores, precioReservaMenores, precioFinal))
        idReserva++
        pintarCarrito()
        pintarNumeroCarrito(reservas.length)
        Toastify({
            text: `Reserva de ${pelicula}` ,
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(90deg, rgba(71,94,207,0.3449754901960784) 0%, rgba(148,187,233,1) 100%)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    } else {
        console.log("Cantidad no valida")
    }
    formEntrada.reset()
})
const divProximamente = document.getElementById("divProximamente")
fetch('./json/estrenos.json') //falta un punto en ruta '../json'
.then(response => response.json())
.then(entradas => {
    entradas.forEach((entrada) => {
        divProximamente.innerHTML += `
        <div class="card cardStyle">
        <div>
        <img src="./img/${entrada.img}" class="card-img-top">
        </div>
        <div class="card-body">
          <h6 class="card-title fw-bold">${entrada.pelicula}</h6>
          <p class="card-text">Genero: ${entrada.genero}</p>
          <p class="card-text">Duracion: ${entrada.duracion}min</p>
          <p class="card-text">Fecha Lanzamiento: ${entrada.fecha_lanzamiento}</p>
        </div>
        `
    })
})