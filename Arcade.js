/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close");
    const notification = document.getElementById("notification");
    // Cerrar modal
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
    window.onclick = (e) => {
        if (e.target === modal)
            modal.style.display = "none";
    };
    // Abrir modal al hacer clic en imagen
    document.querySelectorAll(".item img").forEach((img) => {
        img.addEventListener("click", () => {
            const item = img.closest(".item");
            modalTitle.textContent = item.dataset.title || "Producto";
            modalDescription.textContent = item.dataset.description || "Sin descripción.";
            modalPrice.textContent = "S/ " + (item.dataset.price || "0.00");
            modalImage.src = img.src;
            modalImage.alt = item.dataset.title || "Imagen del producto";
            const modalAddToCartBtn = document.getElementById("modal-add-to-cart");
            modalAddToCartBtn.dataset.id = item.dataset.id;
            modalAddToCartBtn.dataset.title = item.dataset.title;
            modalAddToCartBtn.dataset.description = item.dataset.description;
            modalAddToCartBtn.dataset.price = item.dataset.price;
            modalAddToCartBtn.dataset.image = img.src;
            modal.style.display = "block";
        });
    });
    // Agregar al carrito desde el modal
    document.getElementById("modal-add-to-cart").addEventListener("click", function () {
        const producto = {
            id: this.dataset.id,
            nombre: this.dataset.title,
            descripcion: this.dataset.description,
            precio: parseFloat(this.dataset.price) || 0,
            imagen: this.dataset.image,
            cantidad: 1,
        };
        agregarAlCarrito(producto);
        modal.style.display = "none";
        if (notification) {
            notification.style.display = "flex";
            setTimeout(() => {
                notification.style.display = "none";
            }, 5000);
        }
    });
    // Botones normales fuera del modal
    document.querySelectorAll(".item .add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const item = button.closest(".item");
            const producto = {
                id: item.dataset.id,
                nombre: item.dataset.title,
                descripcion: item.dataset.description,
                precio: parseFloat(item.dataset.price) || 0,
                imagen: item.querySelector("img").src,
                cantidad: 1,
            };
            agregarAlCarrito(producto);
            window.location.href = "Carrito.html";
        });
    });
    // Ir al carrito (si existe botón)
    const goToCart = document.getElementById("go-to-cart");
    if (goToCart) {
        goToCart.addEventListener("click", () => {
            window.location.href = "Carrito.html";
        });
    }

// Clonación segura del carrusel (si aplica)
    document.querySelectorAll(".carousel-track").forEach((track) => {
        if (!track.dataset.cloned) {
            const items = Array.from(track.children);
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
            track.dataset.cloned = "true";
        }
    });
});
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad += producto.cantidad;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.querySelector('#lista-carrito');
    const total = document.querySelector('#total');
    contenedor.innerHTML = "";
    let suma = 0;
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        total.textContent = "Total: S/ 0.00";
        return;
    }

    carrito.forEach(p => {
        suma += p.precio * p.cantidad;
        contenedor.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}" />
          <div class="info">
            <h3>${p.nombre}</h3>
            <div class="cantidad-control">
              <button type="button" onclick="cambiarCantidad('${p.id}', -1)">-</button>
              <span>${p.cantidad}</span>
              <button type="button" onclick="cambiarCantidad('${p.id}', 1)">+</button>
            </div>
            <p>Subtotal: S/ ${(p.precio * p.cantidad).toFixed(2)}</p>
            <button class="eliminar" type="button" onclick="eliminarProducto('${p.id}')">Eliminar</button>
          </div>
        </div>
      `;
    });
    total.textContent = `Total: S/ ${suma.toFixed(2)}`;
}

function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.map(p => {
        if (p.id === id) {
            p.cantidad += cambio;
        }
        return p;
    }).filter(p => p.cantidad > 0); // Elimina productos con cantidad 0 o menos

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
// Solo cargar carrito si estamos en la página carrito, para evitar errores si no hay contenedor
    if (document.querySelector('#lista-carrito')) {
        cargarCarrito();
    }
});
function buscarProducto() {
    const palabraClave = document.getElementById("buscarInput").value.trim().toLowerCase();
    localStorage.setItem("busqueda", palabraClave);
    window.location.href = "ResultadoBusqueda.html";
}

    const items = document.querySelectorAll('.item');
    const productos = [];

    items.forEach(item => {
        productos.push({
            title: item.dataset.title,
            description: item.dataset.description,
            id: item.dataset.id,
            price: item.dataset.price,
            image: item.querySelector('img')?.getAttribute('src') || ""
        });
    });

    localStorage.setItem('productosTotales', JSON.stringify(productos));
    
// --- ICONO DE USUARIO Y MODAL ---
window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('user-icon');
    const modal = document.getElementById('user-modal');
    const userIdText = document.getElementById('user-id-text');
    const userData = localStorage.getItem('loggedUser');

    if (!icon || !modal || !userIdText) {
        console.warn("Elementos faltantes en el DOM");
        return;
    }

    const user = userData ? JSON.parse(userData) : null;

    icon.addEventListener('click', (e) => {
        e.stopPropagation();

        if (user) {
            userIdText.textContent = user.id || "Usuario";
            modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        } else {
            console.log("Usuario no logueado, redirigiendo...");
            window.location.href = 'iniciosesion.html';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-icon-container')) {
            modal.style.display = 'none';
        }
    });
});
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedUser');
        window.location.href = 'iniciosesion.html';
    });
}






