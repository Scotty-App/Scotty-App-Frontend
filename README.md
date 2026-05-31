# Scotty.app

Scotty.app es una plataforma de aprendizaje de programación gamificada, inspirada en el modelo de Duolingo. Los usuarios eligen un lenguaje, completan bloques de preguntas tipo quiz y ganan experiencia (XP) a medida que avanzan.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6 (Vanilla)
- `localStorage` para persistencia de datos

> Sin framework, sin bundler, sin dependencias externas. El proyecto funciona directamente en el navegador.

---

## Estructura del proyecto

```
Scotty-App-Frontend/
├── index.html                          # Landing page pública
├── pages/
│   ├── inicio.html                     # Dashboard post-login
│   ├── lenguajes.html                  # Selección de lenguaje
│   ├── perfil.html                     # Perfil del usuario
│   ├── tienda.html                     # Tienda de recompensas
│   ├── auth/
│   │   ├── signin.html                 # Inicio de sesión
│   │   └── signup.html                 # Registro
│   └── ejercicios/
│       ├── java.html                   # Bloques de Java
│       ├── javascript.html             # Bloques de JavaScript
│       ├── sql.html                    # Bloques de SQL
│       └── html-css.html              # Bloques de HTML y CSS
├── content/
│   └── bloques/{lang}/{nivel}/bloque{n}/
│       ├── pre-bloque{n}-{lang}.html   # Pantalla previa al bloque
│       ├── bloque{n}-{lang}.html       # Preguntas del bloque
│       └── resultado-bloque{n}-{lang}.html  # Resultados
├── assets/
│   ├── css/
│   │   └── estilos.css                 # Estilos globales
│   ├── js/
│   │   └── script.js                   # Lógica de la aplicación
│   └── img/                            # Imágenes y logos
└── README.md
```

---

## Funcionalidades

### Landing page — `index.html`
Página de bienvenida. Presenta la aplicación y redirige al registro o al inicio de sesión.

### Registro — `pages/auth/signup.html`
Formulario que solicita nombre, apellidos, nombre de usuario, correo y contraseña. Los datos se guardan en `localStorage` y redirige al dashboard.

### Inicio de sesión — `pages/auth/signin.html`
Valida las credenciales contra `localStorage`. Si son correctas, redirige al dashboard.

### Dashboard — `pages/inicio.html`
Pantalla principal tras el login. Punto de entrada a las secciones de aprendizaje.

### Selección de lenguaje — `pages/lenguajes.html`
Permite elegir entre cuatro lenguajes disponibles:
- Java
- JavaScript
- SQL
- HTML y CSS

### Bloques de ejercicios — `pages/ejercicios/{lang}.html`
Cada lenguaje tiene cuatro bloques de cinco preguntas tipo test:

| Bloque | Preguntas |
|--------|-----------|
| 1      | 1 – 5     |
| 2      | 6 – 10    |
| 3      | 11 – 15   |
| 4      | 16 – 20   |

Cada bloque sigue el flujo: **pantalla previa → quiz → resultados**.

**Contenidos por lenguaje:**
- **Java:** variables, clases, bucles, objetos y métodos.
- **JavaScript:** variables, funciones, DOM, eventos y localStorage.
- **SQL:** consultas, filtros, agrupaciones, joins y modificaciones de datos.
- **HTML y CSS:** etiquetas, selectores, modelo de caja, flexbox, grid y responsive.

### Perfil — `pages/perfil.html`
Muestra nombre completo, nombre de usuario, correo y XP acumulado.

### Tienda — `pages/tienda.html`
Módulo de recompensas donde los usuarios pueden canjear puntos.

---

## Cómo ejecutar el proyecto

El proyecto no requiere instalación de dependencias ni servidor backend.

### Opción 1: abrir directamente en el navegador

1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto.
3. Haz doble clic en `index.html`.

### Opción 2: Live Server (recomendado)

1. Clona el repositorio:

```bash
git clone https://github.com/Scotty-App/Scotty-App-Frontend
```

2. Abre la carpeta con Visual Studio Code.
3. Instala la extensión **Live Server** si no la tienes.
4. Haz clic derecho sobre `index.html` y selecciona `Open with Live Server`.

Esta opción evita problemas con rutas relativas entre archivos.

---

## Estado del proyecto

El proyecto está en versión inicial funcional: registro, inicio de sesión, selección de lenguaje y navegación por bloques de ejercicios operativos.

**Pendiente de implementar:**
- Corrección automática de ejercicios y puntuación en tiempo real.
- Sistema completo de XP y progreso persistente por usuario.
- Tienda de recompensas funcional.
- Más preguntas, niveles y lenguajes.
- Backend y base de datos real.

---

## Limitaciones actuales

- Toda la lógica es client-side (sin backend).
- Las contraseñas se almacenan en texto plano en `localStorage`.
- Solo admite un usuario activo por navegador.
- El carrito de la tienda no persiste entre recargas.

---

## Conexión FTP

IP:   134.0.10.191
Usuario: scottyapaa
Contraseña: Manuela1234#

## Servidor

Url: http://scotty456:MQGpwhMCh9U3@www.scottyapp.com.mialias.net/
Usuario: scottyapaa
Clave: MQGpwhMCh9U3 