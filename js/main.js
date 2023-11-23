// Enlazo elementos del HTML
const contenedor = document.querySelector("div.container#divcontenedor")
const btnCarrito = document.querySelector("img#logo")
const inputBuscar = document.querySelector("input#inputBusqueda")
const productosEnCarrito = document.querySelector("span#productosEnCarrito")
const btnFinalizar = document.querySelector("button.button-finalizar")

// Invoco localStorage para que nos devuelva el string de localStorage y lo convierto en estructura de datos manipulable por Js
// O inicializo el arreglo carrito vacío
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []

// Función para mostrar las opciones disponibles en pantalla desestructurado
function crearCardHTML({imagen, nombre, precio, id}) {      
  return `<div class="div-card">
              <div class="imagen"><img class="imgCard" src=./${imagen}></div>
              <div class="producto">${nombre}</div>
              <div class="importe">$ ${precio}</div>
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

  } else {
      contenedor.innerHTML = crearCardError()
  }
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
          
          totalVenta += productoSeleccionado.precio;
          productosEnCarrito.innerText = (`El total por los productos seleccionados es: $ ${totalVenta}`)
      })
  })
}

// Llamo a la función para cargar los productos
cargarProductos(productos)

// Muestro un alert con la lista de productos seleccionados
btnCarrito.addEventListener("click", ()=> {
  carrito.length > 0 ? alert(`El carrito tiene los siguientes productos: ${JSON.stringify(carrito)}`)
                     : alert("No hay productos" )
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
  cargarProductos(resultado)
})

// Reseteo el localStorage y cargo la página nuevamente
btnFinalizar.addEventListener("click", ()=> {
  alert("Muchas gracias por comprar con nosotros.")
  localStorage.clear()
  location.reload()
})