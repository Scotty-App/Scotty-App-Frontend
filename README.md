# Scotty.app

Scotty.app es una aplicacion web pensada para aprender programacion mediante ejercicios tipo quiz.
La idea principal es que el usuario pueda elegir un lenguaje, entrar en bloques de preguntas y practicar
de forma sencilla mientras va avanzando.

## Funcionalidad actual

La pagina cuenta actualmente con las siguientes secciones:

## Landing page

Archivo principal: `index.html`

La landing page presenta la aplicacion y explica su objetivo:

- Aprender programacion mediante retos cortos.
- Practicar por lenguajes.
- Ganar experiencia y puntos.
- Usar esos puntos en futuras recompensas.

Desde esta pagina se puede ir al registro o al inicio de sesion.

## Registro

Archivo: `acceso/signup.html`

El formulario de registro pide:

- Nombre/s.
- Apellidos.
- Nombre de usuario.
- Correo electronico.
- Contrasena.

Cuando el usuario se registra, sus datos se guardan en `localStorage`.
Despues del registro, la pagina redirige a la seleccion de lenguajes.

## Inicio de sesion

Archivo: `acceso/signin.html`

El formulario de inicio de sesion pide:

- Correo electronico.
- Contrasena.

La validacion se realiza comparando los datos introducidos con los datos guardados en `localStorage`.
Si los datos son correctos, el usuario entra en la pagina de lenguajes.

## Pagina de lenguajes

Archivo: `lenguajes.html`

En esta pantalla el usuario puede elegir que lenguaje quiere practicar.
Actualmente hay cuatro lenguajes disponibles:

- Java.
- JavaScript.
- SQL.
- HTML y CSS.

Cada lenguaje tiene un boton con su logo y redirige a su propia pagina de bloques.

## Paginas de bloques por lenguaje

Carpeta: `ejercicios`

Cada lenguaje tiene una pagina con cuatro bloques de ejercicios:

- Bloque 1: ejercicios 1 - 5.
- Bloque 2: ejercicios 6 - 10.
- Bloque 3: ejercicios 11 - 15.
- Bloque 4: ejercicios 16 - 20.

Archivos principales:

- `ejercicios/ejercicios-java.html`
- `ejercicios/ejercicios-javascript.html`
- `ejercicios/ejercicios-sql.html`
- `ejercicios/ejercicios-html-css.html`

## Ejercicios

Carpeta: `ejercicios/bloques`

Cada bloque contiene 5 preguntas tipo test especificas del lenguaje seleccionado.
Por ahora las preguntas se muestran en formularios con opciones de respuesta, aunque todavia no se corrigen automaticamente.

Ejemplos:

- Java: variables, clases, bucles, objetos y metodos.
- JavaScript: variables, funciones, DOM, eventos y localStorage.
- SQL: consultas, filtros, agrupaciones, joins y modificaciones de datos.
- HTML y CSS: etiquetas, selectores, modelo de caja, flexbox, grid y responsive.

## Perfil de usuario

Archivo: `perfil.html`

El perfil muestra informacion basica del usuario registrado:

- Nombre completo.
- Nombre de usuario.
- Correo electronico.
- XP inicial.

## Navegacion

La aplicacion tiene un nav fijo en la parte superior cuando el usuario esta dentro de la zona de aprendizaje.
En el nav aparece:

- Enlace a Lenguajes.
- Nombre de usuario.
- Menu desplegable con acceso al perfil y opcion para cerrar sesion.

## Estilos

Archivo: `otros/estilos.css`

La pagina tiene una estetica oscura inspirada en un entorno de programacion.
Usa una paleta sencilla con fondo oscuro y detalles en azul.

El CSS incluye:

- Diseno responsive.
- Tarjetas para bloques y ejercicios.
- Formularios estilizados.
- Botones y enlaces con hover.
- Nav fijo.
- Menu desplegable de usuario.

## JavaScript

Archivo: `otros/script.js`

Actualmente se usa JavaScript para:

- Guardar el usuario registrado en `localStorage`.
- Validar el inicio de sesion.
- Mostrar el nombre de usuario en el nav.
- Mostrar datos del usuario en el perfil.
- Cerrar sesion eliminando el usuario activo.

## Tecnologias utilizadas

- HTML5.
- CSS3.
- JavaScript.
- localStorage.

## Como ejecutar el proyecto en local

Este proyecto no necesita instalar dependencias ni usar una base de datos.
Funciona directamente en el navegador porque esta hecho con HTML, CSS y JavaScript.

### Opcion 1: abrir el archivo directamente

1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto.
3. Haz doble clic en `index.html`.
4. La aplicacion se abrira en el navegador.

### Opcion 2: usar Visual Studio Code con Live Server

1. Clona el repositorio:

```bash
git clone github.com/Scotty-App/Scotty-App-Frontend
```

2. Entra en la carpeta del proyecto:

```bash
cd Scotty-App
```

3. Abre el proyecto con Visual Studio Code.
4. Instala la extension Live Server si no la tienes.
5. Haz clic derecho sobre `index.html`.
6. Selecciona `Open with Live Server`.

Esta opcion es recomendable porque simula mejor una pagina web funcionando en local.

## Estado del proyecto

El proyecto esta en una version inicial funcional.
Ya permite registrarse, iniciar sesion, elegir lenguaje y navegar por bloques de ejercicios.

Faltaria implementar en el futuro:

- Correccion automatica de ejercicios.
- Sistema real de puntos y experiencia.
- Guardado de progreso por usuario.
- Tienda de recompensas.
- Mas preguntas y niveles.
