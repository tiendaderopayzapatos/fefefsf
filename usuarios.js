document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const formRegistro = document.getElementById("form-registro");
  const userMenu = document.getElementById("user-menu");

  const mostrarUsuarioEnMenu = () => {
    const usuarioActual = sessionStorage.getItem("usuarioActual");
    if (usuarioActual && userMenu) {
      userMenu.innerHTML = `<span>Hola, ${usuarioActual}</span> <a href="#" id="cerrar-sesion">(Salir)</a>`;
      document.getElementById("cerrar-sesion").addEventListener("click", () => {
        sessionStorage.removeItem("usuarioActual");
        location.reload();
      });
    }
  };

  if (formRegistro) {
    formRegistro.addEventListener("submit", e => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value;
      const clave = document.getElementById("clave").value;

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      if (usuarios[usuario]) {
        alert("Este usuario ya existe.");
        return;
      }

      usuarios[usuario] = clave;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Registro exitoso. Puedes iniciar sesión.");
      window.location.href = "login.html";
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value;
      const clave = document.getElementById("clave").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      if (usuarios[usuario] === clave) {
        sessionStorage.setItem("usuarioActual", usuario);
        window.location.href = "index.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  }

  mostrarUsuarioEnMenu();
});
