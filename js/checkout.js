// Invoco localStorage para que nos devuelva el string de localStorage y lo convierto en estructura de datos manipulable por Js
// O inicializo el arreglo carrito vacío
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []

// Enlazo elementos del HTML
const tablaDetalle = document.querySelector("table tbody")
const totalCarrito = document.querySelector("td#totalCarrito")
const btnComprar = document.querySelector("button#btnComprar")


// Misma función del main.js para mostrar productos en table
function crearFilaHTML({imagen, nombre, precio}) {
    return `<tr>
                <td class="imagen"><img class="imagenEnTabla" src=./${imagen}></td>
                <td>${nombre}</td>
                <td>${precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</td>
            </tr>`
}

// Misma función del main.js que anida la función precedente, siempre y cuando el array no esté vacío
/// Le agrego el llamado de mostrarTotal
function cargarCarrito() {
    if (carrito.length > 0) {
        tablaDetalle.innerHTML = ""

        carrito.forEach((producto) => {
            tablaDetalle.innerHTML += crearFilaHTML(producto)
        })
        mostrarTotalCarrito()
    }
}

// Función para acumular el valor total y mostrarse en el html
function mostrarTotalCarrito() {
    let montoTotalCarrito = carrito.reduce((acumulador, producto)=> acumulador + producto.precio, 0)
    totalCarrito.textContent = `${montoTotalCarrito.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}`
}

cargarCarrito()

// Con este evento y la librería sweetAlert, damos aviso de finalización de compra
btnComprar.addEventListener("click", ()=> {
    Swal.fire({
        title:  "Su compra fue realizada.",
        text:   "Muchas gracias por comprar con nosotros.",
        icon:   "success",
        theme:  "dark",
    })
    localStorage.removeItem("miCarrito")

// Dando uso de la función asincrónica setTimeout, redirecciono al Home
    setTimeout(()=> {
        location.href = "index.html"
    }, 4000)

})