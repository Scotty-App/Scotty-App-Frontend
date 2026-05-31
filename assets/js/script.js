// Carrito (necesita estar aquí arriba porque varias funciones lo usan)
let carrito = [];


// --- REGISTRO ---
function configurarRegistro() {
    const formSignup = document.getElementById("formSignup");
    if (!formSignup) return;

    formSignup.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuario = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            usuario: document.getElementById("usuario").value,
            correo: document.getElementById("correo").value,
            contrasena: document.getElementById("contrasena").value
        };

        localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
        localStorage.setItem("usuarioActivo", usuario.usuario);
        localStorage.setItem("xpUsuario", "0");
        window.location.href = "../inicio.html";
    });
}


// --- LOGIN ---
function configurarLogin() {
    const formSignin = document.getElementById("formSignin");
    if (!formSignin) return;

    formSignin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.contrasena === contrasena) {
            localStorage.setItem("usuarioActivo", usuarioGuardado.usuario);
            window.location.href = "../inicio.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
}


// --- NOMBRE EN EL MENÚ ---
function mostrarNombreUsuario() {
    const nombreUsuario = document.querySelector(".nombre-usuario");
    if (!nombreUsuario) return;

    const usuarioActivo = localStorage.getItem("usuarioActivo");
    nombreUsuario.textContent = usuarioActivo || "Usuario";
}


// --- CERRAR SESIÓN ---
function configurarCerrarSesion() {
    const cerrarSesion = document.querySelector(".cerrar-sesion");
    if (!cerrarSesion) return;

    cerrarSesion.addEventListener("click", function () {
        localStorage.removeItem("usuarioActivo");
    });
}


// --- PÁGINA DE PERFIL ---
function mostrarPerfil() {
    const perfilNombre = document.getElementById("perfilNombre");
    if (!perfilNombre) return;

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (usuarioGuardado) {
        perfilNombre.textContent = usuarioGuardado.nombre + " " + usuarioGuardado.apellidos;
        document.getElementById("perfilUsuario").textContent = usuarioGuardado.usuario;
        document.getElementById("perfilCorreo").textContent = usuarioGuardado.correo;
        document.getElementById("perfilXp").textContent = localStorage.getItem("xpUsuario") || "0";
    }
}


// --- QUIZ (corrige las respuestas y guarda el resultado) ---
function configurarQuiz() {
    const quizBloque = document.querySelector("[data-quiz]");
    if (!quizBloque) return;

    quizBloque.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const clave = quizBloque.dataset.clave;
        const paginaResultado = quizBloque.dataset.resultado;
        const respuestas = quizBloque.querySelectorAll("input[type='radio']:checked");
        let aciertos = 0;

        respuestas.forEach(function (respuesta) {
            if (respuesta.value === "correcta") {
                aciertos++;
            }
        });

        localStorage.setItem("resultado" + clave, aciertos);
        window.location.href = paginaResultado;
    });
}


// --- RESULTADO DEL BLOQUE ---
function mostrarResultado() {
    const resultadoBloque = document.querySelector("[data-resultado-bloque]");
    if (!resultadoBloque) return;

    const clave = resultadoBloque.dataset.resultadoBloque;
    const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;
    const totalPreguntas = 5;

    const tituloResultado = document.getElementById("tituloResultado");
    const textoResultado = document.getElementById("textoResultado");
    const puntosResultado = document.getElementById("puntosResultado");
    const estadoResultado = document.getElementById("estadoResultado");
    const botonesResultado = document.getElementById("botonesResultado");

    puntosResultado.textContent = aciertos + "/" + totalPreguntas;

    if (aciertos >= 3) {
        // Calcula el XP según el número de bloque (bloques 1-4: fácil, 5-8: medio, 9-12: difícil)
        const numeroBloque = parseInt(clave.replace(/\D/g, ""));
        let xpGanada = 20;
        if (numeroBloque >= 9) xpGanada = 50;
        else if (numeroBloque >= 5) xpGanada = 30;

        // Solo suma XP la primera vez que se supera el bloque
        const claveXp = "xpSumada" + clave;
        if (!localStorage.getItem(claveXp)) {
            const xpActual = Number(localStorage.getItem("xpUsuario")) || 0;
            localStorage.setItem("xpUsuario", xpActual + xpGanada);
            localStorage.setItem(claveXp, "true");
        }

        tituloResultado.textContent = "Enhorabuena, has superado el bloque";
        textoResultado.textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Buen trabajo, ya puedes seguir con el siguiente bloque de aprendizaje.";
        estadoResultado.textContent = "Bloque superado";
        botonesResultado.querySelector("[data-reintentar-bloque]").style.display = "none";

    } else {
        tituloResultado.textContent = "Aún no has superado el bloque";
        textoResultado.textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Necesitas acertar al menos 3 para superar este bloque.";
        estadoResultado.textContent = "Bloque no superado";
        botonesResultado.querySelector("[data-siguiente-bloque]").style.display = "none";
    }
}


// --- ESTADO DE LOS BLOQUES (en la página de ejercicios) ---
function actualizarBloques() {
    const tarjetasBloque = document.querySelectorAll("[data-bloque]");
    if (tarjetasBloque.length === 0) return;

    tarjetasBloque.forEach(function (tarjeta) {
        const clave = tarjeta.dataset.bloque;
        const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;

        if (aciertos >= 3) {
            tarjeta.classList.add("completado");
            tarjeta.querySelector(".estado").textContent = "Completado";
            tarjeta.querySelector("a").textContent = "Repetir bloque";
        }
    });
}


// --- CARRITO DE LA TIENDA ---
function mostrarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    if (!listaCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p class='carrito-vacio'>Todavía no has añadido productos.</p>";
        totalCarrito.textContent = "0,00 EUR";
        return;
    }

    let total = 0;

    carrito.forEach(function (producto, posicion) {
        total += producto.precio * producto.cantidad;

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

function configurarCarrito() {
    const botonesCarrito = document.querySelectorAll(".btn-compra");
    const listaCarrito = document.getElementById("listaCarrito");
    const vaciarCarrito = document.getElementById("vaciarCarrito");
    const finalizarCompra = document.getElementById("finalizarCompra");

    if (botonesCarrito.length === 0 || !listaCarrito) return;

    // Añadir producto al carrito
    botonesCarrito.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);
            const productoEncontrado = carrito.find(function (p) {
                return p.nombre === nombre;
            });

            if (productoEncontrado) {
                productoEncontrado.cantidad++;
            } else {
                carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
            }

            mostrarCarrito();
        });
    });

    // Quitar una unidad al hacer click en "Quitar uno"
    listaCarrito.addEventListener("click", function (evento) {
        if (evento.target.tagName === "BUTTON") {
            const posicion = Number(evento.target.dataset.posicion);
            carrito[posicion].cantidad--;

            if (carrito[posicion].cantidad === 0) {
                carrito.splice(posicion, 1);
            }

            mostrarCarrito();
        }
    });

    if (vaciarCarrito) {
        vaciarCarrito.addEventListener("click", function () {
            carrito = [];
            mostrarCarrito();
        });
    }

    if (finalizarCompra) {
        finalizarCompra.addEventListener("click", function () {
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


// --- INICIO ---
document.addEventListener("DOMContentLoaded", function () {
    configurarRegistro();
    configurarLogin();
    mostrarNombreUsuario();
    configurarCerrarSesion();
    mostrarPerfil();
    configurarQuiz();
    mostrarResultado();
    actualizarBloques();
    configurarCarrito();
});
