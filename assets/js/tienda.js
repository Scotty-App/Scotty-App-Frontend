// =============================================
// tienda.js — Carrito de la tienda
// Se carga únicamente en: tienda.html
// =============================================

// Lista de productos en el carrito (se vacía si recargas la página)
let carrito = [];


// Dibuja el contenido del carrito en la pantalla
function mostrarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    if (!listaCarrito || !totalCarrito) return;

    // Vaciamos el contenedor antes de volver a pintarlo
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p class='carrito-vacio'>Todavía no has añadido productos.</p>";
        totalCarrito.textContent = "0,00 EUR";
        return;
    }

    let total = 0;

    carrito.forEach(function(producto, posicion) {
        total += producto.precio * producto.cantidad;

        // Creamos un elemento HTML por cada producto y lo añadimos al carrito
        const articulo = document.createElement("article");
        articulo.classList.add("item-carrito");
        articulo.innerHTML =
            "<h3>" + producto.nombre + "</h3>" +
            "<p>" + producto.cantidad + " x " + producto.precio.toFixed(2).replace(".", ",") + " EUR</p>" +
            "<button type='button' data-posicion='" + posicion + "'>Quitar uno</button>";

        listaCarrito.appendChild(articulo);
    });

    totalCarrito.textContent = total.toFixed(2).replace(".", ",") + " EUR";
}


// Configura todos los botones de la tienda y el carrito
function configurarCarrito() {
    const botonesAnadir = document.querySelectorAll(".btn-compra");
    const listaCarrito = document.getElementById("listaCarrito");
    const botonVaciar = document.getElementById("vaciarCarrito");
    const botonFinalizar = document.getElementById("finalizarCompra");

    if (botonesAnadir.length === 0 || !listaCarrito) return;

    // Botones "Añadir" de cada producto
    botonesAnadir.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);

            // Si el producto ya está en el carrito, sumamos una unidad más
            const productoExistente = carrito.find(function(p) {
                return p.nombre === nombre;
            });

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
            }

            mostrarCarrito();
        });
    });

    // Botón "Quitar uno" — usamos delegación para capturar clicks dentro del carrito
    listaCarrito.addEventListener("click", function(evento) {
        if (evento.target.tagName === "BUTTON") {
            const posicion = Number(evento.target.dataset.posicion);
            carrito[posicion].cantidad--;

            // Si la cantidad llega a 0, eliminamos el producto del array
            if (carrito[posicion].cantidad === 0) {
                carrito.splice(posicion, 1);
            }

            mostrarCarrito();
        }
    });

    // Botón "Vaciar carrito"
    if (botonVaciar) {
        botonVaciar.addEventListener("click", function() {
            carrito = [];
            mostrarCarrito();
        });
    }

    // Botón "Finalizar compra"
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", function() {
            if (carrito.length === 0) {
                alert("El carrito está vacío");
            } else {
                alert("Compra simulada correctamente. Gracias por apoyar Scotty.App");
                carrito = [];
                mostrarCarrito();
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function() {
    configurarCarrito();
    mostrarCarrito();
});
