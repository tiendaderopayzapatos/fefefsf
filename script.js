function renderizarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");

    const tallas = producto.tallas ? producto.tallas.join(", ") : 
                 producto.tallasZapato ? producto.tallasZapato.join(", ") : "N/A";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p>Tallas disponibles: ${tallas}</p>
      <button onclick="mostrarDescripcion(${producto.id})">Ver detalle</button>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function mostrarDescripcion(id) {
  const producto = productos.find(p => p.id === id);
  document.getElementById("modal-nombre").textContent = producto.nombre;
  document.getElementById("modal-descripcion-texto").textContent = producto.descripcion;
  document.getElementById("modal-descripcion").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal-descripcion").style.display = "none";
}

function agregarAlCarrito(id) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }

  const producto = productos.find(p => p.id === id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito.");
}

function mostrarUsuarioLogueado() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  const menu = document.getElementById("menu");

  if (usuario) {
    menu.innerHTML = `
      <span style="color:white; margin-right:10px;">Hola, ${usuario.nombre}</span>
      <a href="index.html">Inicio</a>
      <a href="carrito.html">Carrito 🛒</a>
      <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
    `;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}

function actualizarBotonPago() {
  const boton = document.getElementById("boton-pagar");
  if (!boton) return;
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  boton.style.display = carrito.length > 0 ? "block" : "none";
}
