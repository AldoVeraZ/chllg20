// Clase Usuario: Define la estructura y datos de un usuario.
class Usuario {
  constructor(id, nombre, correo, contrasena) {
    this.id = id; // Asigna un identificador único al usuario.
    this.nombre = nombre; // Guarda el nombre del usuario.
    this.correo = correo; // Guarda el correo electrónico del usuario.
    this.contrasena = contrasena; // Guarda la contraseña del usuario.
  }
}

// Clase Formulario: Gestiona la lógica de interacción del formulario de registro.
class Formulario {
  constructor() {
    // Intenta cargar los usuarios desde localStorage o inicializa un arreglo vacío si no hay datos.
    this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    this.formulario = document.getElementById("formularioRegistro"); // Accede al formulario en el DOM.
    this.formulario.addEventListener(
      "submit",
      this.registrarUsuario.bind(this)
    ); // Asigna el evento de envío del formulario.
    this.inicializarTabla(); // Muestra la tabla de usuarios inmediatamente al cargar la página.
  }

  // Inicializa la tabla de usuarios al cargar la página.
  inicializarTabla() {
    new TablaUsuarios(this.usuarios);
  }

  // Verifica si el correo ya está registrado en la lista de usuarios.
  usuarioYaExiste(correo) {
    return this.usuarios.some((usuario) => usuario.correo === correo);
  }

  // Valida que el nombre tenga al menos 3 caracteres.
  validarNombre(nombre) {
    return nombre.length >= 3;
  }

  // Valida que el correo cumpla con un formato específico.
  validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // Valida que la contraseña cumpla con los requisitos de seguridad.
  validarContrasena(contrasena) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(contrasena);
  }

  // Función llamada al enviar el formulario.
  // Método que se ejecuta cuando el usuario envía el formulario.
  registrarUsuario(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional (recargando la página).
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    // Valida los campos del formulario.
    if (
      !this.validarNombre(nombre) ||
      !this.validarCorreo(correo) ||
      !this.validarContrasena(contrasena)
    ) {
      alert("Datos inválidos");
      this.formulario.reset(); // Limpia el formulario si los datos son inválidos.
      return;
    }

    // Comprueba si el usuario ya está registrado.
    if (this.usuarioYaExiste(correo)) {
      //   alert("El usuario con este correo ya está registrado.");
      displayToast("El usuario con este correo ya está registrado.");
      this.formulario.reset(); // Limpia el formulario si el usuario ya está registrado.
      return;
    }

    // Crea y añade el nuevo usuario al array de usuarios.
    const usuario = new Usuario(
      this.usuarios.length + 1,
      nombre,
      correo,
      contrasena
    );
    this.usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios)); // Actualiza los usuarios en localStorage.
    displayToast("Usuario registrado correctamente!!.");
    new TablaUsuarios(this.usuarios); // Actualiza la tabla de usuarios en la página.

    // Limpia el formulario después de registrar al usuario.
    this.formulario.reset();
  }
}

// Clase TablaUsuarios: Gestiona la visualización de los usuarios en una tabla.
class TablaUsuarios {
  constructor(usuarios) {
    this.usuarios = usuarios; // Almacena la lista de usuarios.
    this.render(); // Construye y muestra la tabla de usuarios.
  }

  // Construye la tabla y la llena con los datos de los usuarios.
  render() {
    const div = document.getElementById("tablaUsuarios"); // Contenedor de la tabla.
    div.innerHTML = ""; // Limpia la tabla antes de volver a llenarla.
    const tabla = document.createElement("table"); // Crea la tabla.

    // Creación del encabezado de la tabla
    const thead = tabla.createTHead(); // Crea la sección del encabezado en la tabla.
    const headerRow = thead.insertRow(); // Inserta una fila en el encabezado.

    // Define los títulos del encabezado
    const headers = ["ID", "Nombre", "Correo"];
    headers.forEach((text) => {
      const cell = headerRow.insertCell(); // Inserta una celda en la fila del encabezado.
      cell.textContent = text; // Establece el texto de la celda.
      cell.style.fontWeight = "bold"; // Hace que el texto de la celda sea en negrita.
      cell.style.backgroundColor = "#4CAF50"; // Color de fondo para las celdas del encabezado.
      cell.style.color = "white"; // Color del texto para las celdas del encabezado.
      cell.style.padding = "10px"; // Añade relleno dentro de las celdas.
      cell.style.textAlign = "center"; // Alinea el texto al centro de la celda.
    });

    // Genera las filas de la tabla para cada usuario.
    this.usuarios.forEach((usuario) => {
      const fila = tabla.insertRow(); // Crea una fila.
      fila.style.borderBottom = "1px solid #ddd"; // Estilo del borde de la fila.

      let cell = fila.insertCell(); // Celda para el ID.
      cell.textContent = usuario.id;
      cell.style.textAlign = "center"; // Centra el contenido de la celda.

      cell = fila.insertCell(); // Celda para el Nombre.
      cell.textContent = usuario.nombre;
      cell.style.textAlign = "center"; // Centra el contenido de la celda.

      cell = fila.insertCell(); // Celda para el Correo.
      cell.textContent = usuario.correo;
      cell.style.textAlign = "center"; // Centra el contenido de la celda.
    });

    div.appendChild(tabla); // Agrega la tabla al contenedor.
  }
}

new Formulario(); // Instancia la clase Formulario para iniciar la aplicación.

// Función para mostrar un toast
function displayToast(message) {
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;
  toastMessage.classList.add("show");

  // Ocultar el mensaje de toast después de unos segundos
  setTimeout(function () {
    toastMessage.classList.remove("show");
  }, 3000); // Mostrar durante 3 segundos (ajusta según necesites)
}
