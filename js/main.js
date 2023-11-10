// Enlazo elementos del HTML
const contenedor = document.querySelector("div.container#divcontenedor")

// Quise hacer que me contabilice la cantidad de productos seleccionados, pero no pude
const productosEnCarrito = document.querySelector("div#productosEnCarrito")

// Inicializo el arreglo carrito vacío
const carrito = []


// Función para mostrar las opciones disponibles en pantalla

function crearCardHTML(producto) {      
  return `<div class="div-card">
              <div class="imagen">${'<img src=./imagenes>'}</div>
              <div class="producto">${producto.nombre}</div>
              <div class="importe">$ ${producto.precio}</div>
              <button id="${producto.id}" class="add-to-cart">Agregar</button>
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

function cargarProductos() {
  if (productos.length > 0) {
      contenedor.innerHTML = ""
      // Bucle para que cada elemento de "crearCardHTML" pase por la función siguiente
      productos.forEach((producto)=> contenedor.innerHTML += crearCardHTML(producto))
      // Llamo a función que me permite a travez de un evento, agregar un producto en la lista
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
          console.table(carrito)
          totalVenta += productoSeleccionado.precio;
          console.log(`El total por los productos seleccionados es: $ ${totalVenta}`)
      })
  })

}

// Llamo a la función para cargar los productos
cargarProductos()