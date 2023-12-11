// Utilizo este URL para simular un repositorio en linea, pero lo hago de manera local
const URL = "js/productos.json"
const productos = []

// Invoco localStorage para que nos devuelva el string de localStorage y lo convierto en estructura de datos manipulable por Js
// O inicializo el arreglo carrito vacío
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []

// Enlazo elementos del HTML
const contenedor = document.querySelector("div.container#divcontenedor")
const btnCarrito = document.querySelector("img#logo")
const inputBuscar = document.querySelector("input#inputBusqueda")
const productosEnCarrito = document.querySelector("span#productosEnCarrito")


// Función para mostrar las opciones disponibles en pantalla desestructurado
function crearCardHTML({imagen, nombre, precio, id}) {      
  return `<div class="div-card">
              <div class="imagen"><img class="imgCard" src=./${imagen}></div>
              <div class="producto">${nombre}</div>
              <div class="importe">${precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</div>
              <button id="${id}" class="add-to-cart">Agregar</button>
          </div>`
}


// Función para informar en el HTML que no se eligieron productos (array vacío)
function crearCardError() {
  return `<div class="div-card-error">
            <div class="imagen-error">🤦🏻‍♂️</div>
            <div class="leyenda-error">No pudimos cargar los productos</div>
            <div class="leyenda-intento">Intenta nuevamente en unos segundos.</div>
          </div>`
}

// Función que anida otra función siempre y cuando el array productos no este vacío
function cargarProductos(arreglo) {
  if (arreglo.length > 0) {
      contenedor.innerHTML = ""
      // Bucle para que cada elemento de "crearCardHTML" pase por la función siguiente
      arreglo.forEach((producto)=> contenedor.innerHTML += crearCardHTML(producto))
      // Llamo a función que me permite a traves de un evento, agregar un producto en la lista
      activarClickEnBotones()
  }
}

function mensajeToast(mensaje) {
  Toastify({
      text: mensaje,
      duration: 1500,
      style: {
        background: "green",
      }
    }).showToast()
}

// Función para tomar el evento "click" de lo seleccionado y mostrar los resultados en tabla
function activarClickEnBotones() {
  // Inicializo esta variable en 0, para luego usarla como acumulador y mostrar el precio final
  let totalVenta = 0;
  // Enlazo button de la función "crearCardHTML"
  const botonesAgregar = document.querySelectorAll("button.add-to-cart")
  botonesAgregar.forEach((boton)=> { // se suele utilizar "e, ev, evt, event"
      boton.addEventListener("click", (event)=> {
          const id = parseInt(event.target.id)
          const productoSeleccionado = productos.find((producto)=> producto.id === id)
          carrito.push(productoSeleccionado)
          localStorage.setItem("miCarrito", JSON.stringify(carrito))
          mensajeToast(`${productoSeleccionado.nombre} se agregó al carrito`)

          totalVenta += productoSeleccionado.precio;
          productosEnCarrito.innerText = (`El total por los productos seleccionados es: $ ${totalVenta}`)
      })
  })
}

// Esta función toma un repositorio local y lo convierte en un array para que lo pueda procesar js
function obtenerProductos() {
  fetch(URL)
  .then((response)=> response.json())
  .then((data)=> productos.push(...data) )
  .then(()=> cargarProductos(productos) )
  .catch((error)=> contenedor.innerHTML = crearCardError())
}

obtenerProductos()

// Llamo a la función para cargar los productos
// cargarProductos(productos)

// Direcciono a un nuevo HTML con la lista de productos seleccionados
btnCarrito.addEventListener("click", ()=> {
  if (carrito.length > 0) {
      location.href = "checkout.html"
  }
})

// Muestro cuantos productos tiene el carrito con un .title
btnCarrito.addEventListener("mousemove", ()=> {
  btnCarrito.title = carrito.length > 0 ? `${carrito.length} productos en carrito` 
                                        : "Carrito sin productos"
})

// Barra de búsqueda
inputBuscar.addEventListener("search", ()=> {
  let textoAbuscar = inputBuscar.value.trim().toLowerCase()
  // Resultado es el nuevo array con los productos que cumplen lo que el usuraio escribió
  let resultado = productos.filter((producto)=> producto.nombre.toLowerCase().includes(textoAbuscar))
  // Llamo a "cargarProductos" con este nuevo array, para que me muestre solo lo que busqué en el buscador
  cargarProductos(resultado)
})