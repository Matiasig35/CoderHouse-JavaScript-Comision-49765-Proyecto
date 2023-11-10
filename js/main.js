// Enlazo elementos del HTML
const contenedor = document.querySelector("div.container#divcontenedor")
const productosEnCarrito = document.querySelector("div#productosEnCarrito")

// Inicializo el arreglo carrito vacío
const carrito = []


// Función para mostrar las opciones disponibles al cliente

function crearCardHTML(producto) {      
  return `<div class="div-card">
              <div class="imagen">${'<img src=./imagenes>'}</div>
              <div class="producto">${producto.nombre}</div>
              <div class="importe">$ ${producto.precio}</div>
              <button id="${producto.id}" class="add-to-cart">Agregar</button>
          </div>`
}
  

function crearCardError() {
  return `<div class="div-card-error">
            <div class="imagen-error">🤦🏻‍♂️</div>
            <div class="leyenda-error">No pudimos cargar los productos</div>
            <div class="leyenda-intento">Intenta nuevamente en unos segundos.</div>
          </div>`
}


function cargarProductos() {
    if (productos.length > 0) {
        contenedor.innerHTML = ""
        productos.forEach((producto)=> contenedor.innerHTML += crearCardHTML(producto))
        
        //llamo a función
        activarClickEnBotones()
        productosEnCarrito.innerHTML = ""

    } else {
        contenedor.innerHTML = crearCardError()
    }
}

function activarClickEnBotones() {
  const botonesAgregar = document.querySelectorAll("button.add-to-cart")
  botonesAgregar.forEach((boton)=> { // e, ev, evt, event
      boton.addEventListener("click", (e)=> {
          const id = parseInt(e.target.id)
          const productoSeleccionado = productos.find((producto)=> producto.id === id)
          carrito.push(productoSeleccionado)
          console.table(carrito)
      })
  })

}


cargarProductos()



  
  // Función para vender productos

  function venderProductos() {
    // Inicializo esta variable en 0, para luego usarla como acumulador
    let totalVenta = 0;
  
    while (true) {
      mostrarOpciones();
      let opcion = parseInt(prompt('Ingrese el número del producto que desea comprar (0 para salir):'));
  
      // Para salir del bucle si el cliente elige la opción 0
      if (opcion === 0) {
        break; 
      }
  
      if (opcion >= 1 && opcion <= producto.length) {
        // Como el arreglo empieza numerando en 0, le tengo que restar 1 a la variable "opcion"
        const productoSeleccionado = producto[opcion - 1];
        console.log(`Has seleccionado: ${productoSeleccionado.nombre} - $ ${productoSeleccionado.precio}`);
        totalVenta += productoSeleccionado.precio;
        console.log(`El subtotal por los productos seleccionados es: $ ${totalVenta}`)
      } else {
        console.warn('Opción inválida. Inténtelo de nuevo.');
      }
    }
  
    console.log(`Gracias por su compra. Total final: $ ${totalVenta}`);
  }
  
  // Llamo a la función para iniciar la venta de productos
  venderProductos();