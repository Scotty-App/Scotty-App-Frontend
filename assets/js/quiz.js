// =============================================
// quiz.js — Quiz, resultados y estado de los bloques
// Se carga en: páginas de ejercicios y bloques de contenido
// =============================================


// Corrige las respuestas del quiz y guarda el resultado en localStorage
function configurarQuiz() {
    const formularioQuiz = document.querySelector("[data-quiz]");
    if (!formularioQuiz) return;

    formularioQuiz.addEventListener("submit", function(evento) {
        evento.preventDefault();

        // Leemos el identificador del bloque y la ruta a la página de resultados
        const clave = formularioQuiz.dataset.clave;
        const paginaResultado = formularioQuiz.dataset.resultado;

        // Contamos cuántas respuestas marcadas tienen value="correcta"
        const respuestasSeleccionadas = formularioQuiz.querySelectorAll("input[type='radio']:checked");
        let aciertos = 0;

        respuestasSeleccionadas.forEach(function(respuesta) {
            if (respuesta.value === "correcta") {
                aciertos++;
            }
        });

        // Guardamos el resultado y redirigimos a la página de resultados
        localStorage.setItem("resultado" + clave, aciertos);
        window.location.href = paginaResultado;
    });
}


// Muestra el resultado del bloque y suma XP si se ha superado
function mostrarResultado() {
    const seccionResultado = document.querySelector("[data-resultado-bloque]");
    if (!seccionResultado) return;

    const clave = seccionResultado.dataset.resultadoBloque;
    const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;
    const totalPreguntas = 5;

    // Mostramos cuántas preguntas ha acertado el usuario
    document.getElementById("puntosResultado").textContent = aciertos + "/" + totalPreguntas;

    if (aciertos >= 3) {
        const xpActual = Number(localStorage.getItem("xpUsuario")) || 0;
        localStorage.setItem("xpUsuario", xpActual + 30);

        document.getElementById("tituloResultado").textContent = "Enhorabuena, has superado el bloque";
        document.getElementById("textoResultado").textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Buen trabajo, ya puedes seguir con el siguiente bloque.";
        document.getElementById("estadoResultado").textContent = "Bloque superado";
        document.getElementById("botonesResultado").querySelector("[data-reintentar-bloque]").style.display = "none";

    } else {
        document.getElementById("tituloResultado").textContent = "Aún no has superado el bloque";
        document.getElementById("textoResultado").textContent = "Has acertado " + aciertos + " de " + totalPreguntas + " preguntas. Necesitas al menos 3 para superar este bloque.";
        document.getElementById("estadoResultado").textContent = "Bloque no superado";
        document.getElementById("botonesResultado").querySelector("[data-siguiente-bloque]").style.display = "none";
    }
}


// Marca como completados los bloques que ya han sido superados
function actualizarBloques() {
    const tarjetas = document.querySelectorAll("[data-bloque]");
    if (tarjetas.length === 0) return;

    tarjetas.forEach(function(tarjeta) {
        const clave = tarjeta.dataset.bloque;
        const aciertos = Number(localStorage.getItem("resultado" + clave)) || 0;

        if (aciertos >= 3) {
            tarjeta.classList.add("completado");
            tarjeta.querySelector(".estado").textContent = "Completado";
            tarjeta.querySelector("a").textContent = "Repetir bloque";
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    configurarQuiz();
    mostrarResultado();
    actualizarBloques();
});
