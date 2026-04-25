document.addEventListener("DOMContentLoaded", function () {
    const formSignup = document.getElementById("formSignup");
    const formSignin = document.getElementById("formSignin");
    const nombreUsuario = document.querySelector(".nombre-usuario");
    const cerrarSesion = document.querySelector(".cerrar-sesion");
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilUsuario = document.getElementById("perfilUsuario");
    const perfilCorreo = document.getElementById("perfilCorreo");

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
            window.location.href = "../lenguajes.html";
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
                window.location.href = "../lenguajes.html";
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
});
