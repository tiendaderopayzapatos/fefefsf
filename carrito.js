document.addEventListener("DOMContentLoaded", () => {
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const totalCarrito = document.getElementById("total-carrito");
    const pagarBtn = document.getElementById("pagar-btn");
    const vaciarBtn = document.getElementById("vaciar-carrito");

    const usuarioActual = sessionStorage.getItem("usuarioActual");
    if (!usuarioActual) {
        alert("Debes iniciar sesión para ver tu carrito.");
        window.location.href = "login.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function mostrarCarrito() {
        carritoContenedor.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
            pagarBtn.style.display = "none";
            vaciarBtn.style.display = "none";
        } else {
            carrito.forEach(item => {
                const div = document.createElement("div");
                div.className = "item-carrito";
                div.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}" />
                    <p>${item.nombre}</p>
                    <p>Talla: ${item.talla}</p>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                `;
                carritoContenedor.appendChild(div);
                total += item.precio;
            });

            totalCarrito.textContent = total.toFixed(2);
            pagarBtn.style.display = "inline-block";
            vaciarBtn.style.display = "inline-block";
        }
    }

    vaciarBtn.addEventListener("click", () => {
        if (confirm("¿Deseas vaciar el carrito?")) {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
    });

    pagarBtn.addEventListener("click", () => {
        window.location.href = "pagos.html";
    });

    mostrarCarrito();
});
