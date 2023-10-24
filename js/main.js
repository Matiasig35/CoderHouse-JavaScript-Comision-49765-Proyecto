// Lista de productos con precios en un arreglo
const producto = [
    { nombre: 'Mate Justo Plateado', precio: 24200 },
    { nombre: 'Mate Justo Blanco Texturado', precio: 24200 },
    { nombre: 'Mate Justo Negro Texturado', precio: 24200 },
    { nombre: 'Mate Justo Rojo Texturado', precio: 24200 },
    { nombre: 'Bolso Justo', precio: 26500 },
    { nombre: 'Yerba Ana Carolina', precio: 2100 },
];
  
  // Función para mostrar las opciones disponibles al cliente
  // Utilizo la función y el bucle "for" para mostrar la lista del arreglo
  function mostrarOpciones() {
    console.log('Opciones disponibles:');
    for (let i = 0; i < producto.length; i++) {
      console.log(`${i + 1}. ${producto[i].nombre} - $ ${producto[i].precio}`);
    }
    console.log('0. Salir');
  }
  
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