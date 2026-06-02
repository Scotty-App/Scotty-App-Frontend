// =============================================
// ui.js — Menú de navegación y página de perfil
// Se carga en todas las páginas con sesión activa
// =============================================


// Muestra el nombre del usuario en el menú de navegación
function mostrarNombreUsuario() {
    const elementoNombre = document.querySelector(".nombre-usuario");
    if (!elementoNombre) return;

    const usuarioActivo = localStorage.getItem("usuarioActivo");
    elementoNombre.textContent = usuarioActivo || "Usuario";
}


// Rellena la página de perfil con los datos del usuario guardado
function mostrarPerfil() {
    const campoNombre = document.getElementById("perfilNombre");
    if (!campoNombre) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));
    if (!usuario) return;

    document.getElementById("perfilNombre").textContent = usuario.nombre + " " + usuario.apellidos;
    document.getElementById("perfilUsuario").textContent = usuario.usuario;
    document.getElementById("perfilCorreo").textContent = usuario.correo;
    document.getElementById("perfilXp").textContent = localStorage.getItem("xpUsuario") || "0";
}


// Cierra la sesión cuando el usuario hace click en "Cerrar sesión"
function configurarCerrarSesion() {
    const botonCerrar = document.querySelector(".cerrar-sesion");
    if (!botonCerrar) return;

    botonCerrar.addEventListener("click", function() {
        localStorage.removeItem("usuarioActivo");
    });
}


document.addEventListener("DOMContentLoaded", function() {
    mostrarNombreUsuario();
    mostrarPerfil();
    configurarCerrarSesion();
});