document.addEventListener("DOMContentLoaded", function () {
    const formSignup = document.getElementById("formSignup");
    const formSignin = document.getElementById("formSignin");
    const nombreUsuario = document.querySelector(".nombre-usuario");
    const cerrarSesion = document.querySelector(".cerrar-sesion");
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilUsuario = document.getElementById("perfilUsuario");
    const perfilCorreo = document.getElementById("perfilCorreo");
    const quizBloque = document.querySelector("[data-quiz]");
    const resultadoBloque = document.querySelector("[data-resultado-bloque]");
    const tituloResultado = document.getElementById("tituloResultado");
    const textoResultado = document.getElementById("textoResultado");
    const puntosResultado = document.getElementById("puntosResultado");
    const estadoResultado = document.getElementById("estadoResultado");
    const botonesResultado = document.getElementById("botonesResultado");
    const tarjetasBloque = document.querySelectorAll("[data-bloque]");

    if (formSignup) {
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
            window.location.href = "../inicio.html";
        });
    }

    if (formSignin) {
        formSignin.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;
            const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

            if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.contrasena === contrasena) {
                localStorage.setItem("usuarioActivo", usuarioGuardado.usuario);
                window.location.href = "../inicio.html";
            } else {
                alert("Correo o contrasena incorrectos");
            }
        });
    }

    if (nombreUsuario) {
        const usuarioActivo = localStorage.getItem("usuarioActivo");
        nombreUsuario.textContent = usuarioActivo || "Usuario";
    }

    if (perfilNombre && perfilUsuario && perfilCorreo) {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        if (usuarioGuardado) {
            perfilNombre.textContent = usuarioGuardado.nombre + " " + usuarioGuardado.apellidos;
            perfilUsuario.textContent = usuarioGuardado.usuario;
            perfilCorreo.textContent = usuarioGuardado.correo;
        }
    }

    if (cerrarSesion) {
        cerrarSesion.addEventListener("click", function () {
            localStorage.removeItem("usuarioActivo");
        });
    }

    if (quizBloque) {
        quizBloque.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const clave = quizBloque.dataset.clave;
            const paginaResultado = quizBloque.dataset.resultado;
            const respuestas = quizBloque.querySelectorAll("input[type='radio']:checked");
            let aciertos = 0;

            respuestas.forEach(function (respuesta) {
                if (respuesta && respuesta.value === "correcta") {
                    aciertos++;
                }
            });

            localStorage.setItem("resultado" + clave, aciertos);
            window.location.href = paginaResultado;
        });
    }

    if (resultadoBloque && tituloResultado && textoResultado && puntosResultado && estadoResultado && botonesResultado) {
        const clave = resultadoBloque.dataset.resultadoBloque;
        const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;
        const totalPreguntas = 5;
        const botonReintentar = botonesResultado.querySelector("[data-reintentar-bloque]");
        const botonSiguiente = botonesResultado.querySelector("[data-siguiente-bloque]");

        puntosResultado.textContent = aciertos + "/" + totalPreguntas;

        if (aciertos >= 3) {
            tituloResultado.textContent = "Enhorabuena, has superado el bloque";
            textoResultado.textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Buen trabajo, ya puedes seguir con el siguiente bloque de aprendizaje.";
            estadoResultado.textContent = "Bloque superado";

            if (botonReintentar) {
                botonReintentar.style.display = "none";
            }
        } else {
            tituloResultado.textContent = "Aun no has superado el bloque";
            textoResultado.textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Necesitas acertar al menos 3 para superar este bloque.";
            estadoResultado.textContent = "Bloque no superado";

            if (botonSiguiente) {
                botonSiguiente.style.display = "none";
            }
        }
    }

    if (tarjetasBloque.length > 0) {
        tarjetasBloque.forEach(function (tarjeta) {
            const clave = tarjeta.dataset.bloque;
            const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;
            const estado = tarjeta.querySelector(".estado-bloque");
            const enlace = tarjeta.querySelector("a");

            if (aciertos >= 3) {
                tarjeta.classList.add("bloque-completado");

                if (estado) {
                    estado.textContent = "Completado";
                }

                if (enlace) {
                    enlace.textContent = "Repetir bloque";
                }
            }
        });
    }
});
