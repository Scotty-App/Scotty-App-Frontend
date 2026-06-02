// =============================================
// auth.js — Registro e inicio de sesión
// Se carga únicamente en: signin.html y signup.html
// =============================================


// Registro de nuevo usuario
function configurarRegistro() {
    const formulario = document.getElementById("formSignup");
    if (!formulario) return;

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        // Recogemos todos los campos del formulario en un objeto
        const nuevoUsuario = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            usuario: document.getElementById("usuario").value,
            correo: document.getElementById("correo").value,
            contrasena: document.getElementById("contrasena").value
        };

        // Guardamos el usuario en localStorage y lo marcamos como activo
        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
        localStorage.setItem("usuarioActivo", nuevoUsuario.usuario);
        localStorage.setItem("xpUsuario", "0");

        window.location.href = "../inicio.html";
    });
}


// Inicio de sesión
function configurarLogin() {
    const formulario = document.getElementById("formSignin");
    if (!formulario) return;

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correoEscrito = document.getElementById("correo").value;
        const contrasenaEscrita = document.getElementById("contrasena").value;

        // Recuperamos el usuario guardado y comprobamos que los datos coincidan
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        if (usuarioGuardado && usuarioGuardado.correo === correoEscrito && usuarioGuardado.contrasena === contrasenaEscrita) {
            localStorage.setItem("usuarioActivo", usuarioGuardado.usuario);
            window.location.href = "../inicio.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    configurarRegistro();
    configurarLogin();
});
