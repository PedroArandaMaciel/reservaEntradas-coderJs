class Reserva {
    constructor(pelicula = "", cantMayor = 0, cantMenor = 0, id, precioTotal) {
        this.Pelicula = pelicula;
        this.Mayores = cantMayor;
        this.Menores = cantMenor;
        this.Id = id;
        this.PrecioTotal = precioTotal
    }
}
function calcularEntrada(cantidadDeEntradas = 1, edad = "") {   //Retorna el precio. Recibe la cantidad y "mayor" o "menor"
    const PRECIOMAYOR = 900
    const PRECIOMENOR = 450
    let valor = (edad === "mayor") ? PRECIOMAYOR * cantidadDeEntradas : (edad === "menor") ? PRECIOMENOR * cantidadDeEntradas : 0
    return valor
}
function pintarNumeroCarrito(cantidadReservas) {                        //injecta un span en carrito para mostrar el numero de reservas
    const numeroCarrito = document.getElementById("spanCantCarrito")
    numeroCarrito.innerHTML = `
    <span class="badge bg-primary rounded-pill">${cantidadReservas}</span>
    `
}
function pintarEstructuraEntrada(reserva) {
    divEntradas.innerHTML += `
    <div class="card border-success mb-3 reserva${reserva.Id}">
        <div class="card-header bg-transparent border-success">Reserva numero ${reserva.Id}</div>
            <div class="card-body text-success">
            <h5 class="card-title">${reserva.Pelicula}</h5>
            <p class="card-text">Mayores: ${reserva.Mayores}</p>
            <p class="card-text">Menores: ${reserva.Menores}</p>
            <p class="card-text">Precio Total: $${reserva.PrecioTotal}</p>
        </div>
        <button class="btn btn-danger">Remover Reserva</button>
    </div>
    `
}
function pintarCarrito() {
    const divEntradas = document.getElementById("divEntradas")
    divEntradas.innerText = ""
    reservas.forEach(reserva => {               //por cada reserva en mi array, llamo a la funcion y pinto la o las reservas en carrito
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
        let precioFinal = (precioReservaMayores + precioReservaMenores)
        const entrada = new Reserva(pelicula, cantMayores, cantMenores, idReserva, precioFinal)
        reservas.push(entrada)
        localStorage.setItem("reservasLS", JSON.stringify(reservas))      //actualiza el storage a medida se generan reservas validas
        idReserva++
        pintarCarrito()
        pintarNumeroCarrito(reservas.length)   //le paso como argumento el tamaño de mi array para mostrar la cantidad de reservas
        Toastify({
            text: `Reserva de "${pelicula}"` ,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(90deg, rgba(71,94,207,0.3449754901960784) 0%, rgba(148,187,233,1) 100%)",
            },
            onClick: function(){
                document.getElementById("carritoBoton").click()
            } // Callback after click
          }).showToast();
    } else {
        Toastify({
            text: "Valores no validos, intente nuevamente por favor" ,
            duration: 1500,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
            },
            onClick: function(){}
          }).showToast();
    }
    formEntrada.reset()
})
const divProximamente = document.getElementById("divProximamente")
fetch('./json/estrenos.json')
.then(response => response.json())
.then(estrenosProx => {
    estrenosProx.forEach((pelicula) => {
        divProximamente.innerHTML += `
        <div class="card cardStyle">
        <div>
        <img src="./img/${pelicula.img}" class="card-img-top">
        </div>
        <div class="card-body">
          <h6 class="card-title fw-bold">${pelicula.pelicula}</h6>
          <p class="card-text">Genero: ${pelicula.genero}</p>
          <p class="card-text">Duracion: ${pelicula.duracion}min</p>
          <p class="card-text">Fecha Lanzamiento: ${pelicula.fecha_lanzamiento}</p>
        </div>
        `
    })
})