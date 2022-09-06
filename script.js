class Reserva {
    constructor(pelicula = "", cantMayor = 0, cantMenor = 0, precioTotal) {
        this.Pelicula = pelicula;
        this.Mayores = cantMayor;
        this.Menores = cantMenor;
        this.PrecioTotal = precioTotal
    }
}
class Cuenta {
    constructor(nombre = "Anonimo", apellido = "Anonimo", email, psw) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Email = email;
        this.Password = psw
    }
}
function calcularEntrada(cantidadDeEntradas = 1, edad = "") {                       //Recibe la cantidad y "mayor" o "menor"
    const PRECIOMAYOR = 900
    const PRECIOMENOR = 450
    let valorTotal = (edad === "mayor") ? PRECIOMAYOR * cantidadDeEntradas : (edad === "menor") ? PRECIOMENOR * cantidadDeEntradas : 0
    return valorTotal
}
function numeroCarritoInner(cantidadReservas) {                                 //muestra span con numero de elementos en carrito
    const numeroCarrito = document.getElementById("spanCantCarrito")
    numeroCarrito.innerHTML = `
    <span class="badge bg-primary rounded-pill">${cantidadReservas}</span>
    `
}
function estructuraCard(reserva, index) {
    divEntradas.innerHTML += `
    <div class="card border-success mb-3" id="reserva${index}">        
        <div class="card-header bg-transparent border-success">Reserva numero ${index + 1}</div>
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
    reservas.forEach((reserva, index) => {
        estructuraCard(reserva, index)
    })
    eventBotonRemover()        //aplicar evento en los botones de las cards
}
function valoresNoValidos() {
    Toastify({
        text: "Valores no validos, intente nuevamente por favor",
        duration: 1500,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
        },
        onClick: function () { }
    }).showToast();
}
function eventBotonRemover() {
    reservas.forEach((reserva, index) => {
        document.getElementById(`reserva${index}`).children[2].  //boton de cada card
            addEventListener('click', () => {
                document.getElementById(`reserva${index}`).remove()
                reservas.splice(index, 1)
                localStorage.setItem("reservasLS", JSON.stringify(reservas))
                numeroCarritoInner(reservas.length)
                pintarCarrito()                     //reiniciar los elementos para que coincida el index del dom con el del array reservas
                Toastify({
                    text: `Reserva De "${reserva.Pelicula}" Removida Con Exito`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
                    },
                    onClick: function () { }
                }).showToast();
            })
    })
}
function eventBotonLimpiar() {
    document.getElementById("limpiarCarrito").
        addEventListener('click', () => {
            if (reservas.length > 0) {
                reservas.forEach((reserva, index) => {
                    document.getElementById(`reserva${index}`).remove()
                })
                reservas.splice(0, reservas.length)
                localStorage.clear("reservasLS")
                numeroCarritoInner(reservas.length)
                Toastify({
                    text: `Reservas Removidas Con Exito`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
                    },
                    onClick: function () { }
                }).showToast();
            } else {
                Toastify({
                    text: `El Carrito Se Encuentra Vacio`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
                    },
                    onClick: function () { }
                }).showToast();
            }
        })
}
function eventBotonFinCompra() {
    document.getElementById("botonFinalizarCompra").
        addEventListener('click', () => {
            if (reservas.length > 0) {
                reservas.forEach((reserva, index) => {
                    document.getElementById(`reserva${index}`).remove()
                })
                reservas.splice(0, reservas.length)
                localStorage.clear("reservasLS")
                numeroCarritoInner(reservas.length)
                Toastify({
                    text: `Compra finalizada Con Exito!!`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                    },
                    onClick: function () { }
                }).showToast();
            } else {
                Toastify({
                    text: `No Se Han Registrados Reservas. Por favor intente agregando una pelicula`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(90deg, rgba(176,56,56,0.8855917366946778) 100%, rgba(233,148,187,1) 100%)",
                    },
                    onClick: function () { }
                }).showToast();
            }
        })
}
const reservas = []
let ultimasReservasStorage = []
//consulta al localStorage
if (localStorage.getItem("reservasLS")) {
    ultimasReservasStorage = JSON.parse(localStorage.getItem("reservasLS"))
    numeroCarritoInner(ultimasReservasStorage.length)
    ultimasReservasStorage.forEach((reserva, index) => {    //igualar reservas[] con ultimasReservasStorage[] y pintar DOM
        reservas.push(reserva)
        estructuraCard(reserva, index)
    })
    eventBotonRemover()
}
eventBotonLimpiar()
eventBotonFinCompra()
//Condicion para revisar si me encuentro en el index, registro o sesion y aplicar su respectivo codigo JS
if (document.getElementById("pageName").value == "index") {
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
            const entrada = new Reserva(pelicula, cantMayores, cantMenores, precioFinal)
            reservas.push(entrada)
            localStorage.setItem("reservasLS", JSON.stringify(reservas))      //actualiza el storage a medida se generan reservas validas
            pintarCarrito()
            numeroCarritoInner(reservas.length)
            Toastify({
                text: `Reserva de "${pelicula}"`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(90deg, rgba(71,94,207,0.3449754901960784) 0%, rgba(148,187,233,1) 100%)",
                },
                onClick: function () {
                    document.getElementById("carritoBoton").click()
                } // Callback after click
            }).showToast();
        } else {
            valoresNoValidos()
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
} else if (document.getElementById("pageName").value == "registro") {
    let cuentas = []
    if (localStorage.getItem("cuentas")) {
        cuentas = JSON.parse(localStorage.getItem("cuentas"))
        console.log(cuentas)
    }
    const formRegistro = document.getElementById("formRegistro")
    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault()
        const pattern = new RegExp('[A-Za-z]+');
        const dataForm = new FormData(event.target)
        const nombre = dataForm.get("inputName")
        const apellido = dataForm.get("inputSurname")
        const email = dataForm.get("inputEmail")
        const psw = dataForm.get("inputPsw")
        if (!pattern.test(nombre) || !pattern.test(apellido)) {
            valoresNoValidos()
        } else if (nombre != "" && apellido != "" && email != "" && psw != "") {
            const cuenta = new Cuenta(nombre, apellido, email, psw)
            cuentas.push(cuenta)
            localStorage.setItem("cuentas", JSON.stringify(cuentas)) //simular base de datos con local storage
            formRegistro.reset()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your account has been created',
                showConfirmButton: true,
                timer: 1500
            })
        } else {
            valoresNoValidos()
        }
    })
} else if (document.getElementById("pageName").value == "sesion") {
    let cuentas = []
    if (localStorage.getItem("cuentas")) {
        cuentas = JSON.parse(localStorage.getItem("cuentas"))
        console.log(cuentas)
    }
}
