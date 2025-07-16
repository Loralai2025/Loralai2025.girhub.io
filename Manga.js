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
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target === modal)
            modal.style.display = "none";
    };
    // Abrir modal
    document.querySelectorAll('.item img').forEach(img => {
        img.addEventListener('click', () => {
            const item = img.closest('.item');
            modalTitle.textContent = item.dataset.title || "Producto";
            modalDescription.textContent = item.dataset.description || "Sin descripción.";
            modalPrice.textContent = item.dataset.price || "Precio no disponible";
            modalImage.src = img.src;
            modalImage.alt = item.dataset.title || "Imagen del producto";
            const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
            modalAddToCartBtn.dataset.id = item.dataset.id;
            modalAddToCartBtn.dataset.title = item.dataset.title;
            modalAddToCartBtn.dataset.description = item.dataset.description;
            modalAddToCartBtn.dataset.price = item.dataset.price;
            modalAddToCartBtn.dataset.image = img.src;
            modal.style.display = 'block';
        });
    });
    // Agregar al carrito desde el modal
    document.getElementById('modal-add-to-cart').addEventListener('click', function () {
        const producto = {
            id: this.dataset.id,
            nombre: this.dataset.title,
            descripcion: this.dataset.description,
            precio: parseFloat(this.dataset.price),
            imagen: this.dataset.image,
            cantidad: 1
        };
        agregarAlCarritoSinAgrupar(producto);
        modal.style.display = "none";
        notification.style.display = 'flex';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    });
    // Botones normales fuera del modal
    document.querySelectorAll('.item .add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.item');
            const producto = {
                id: item.dataset.id,
                nombre: item.dataset.title,
                descripcion: item.dataset.description,
                precio: parseFloat(item.dataset.price),
                imagen: item.querySelector('img').src,
                cantidad: 1
            };
            agregarAlCarritoSinAgrupar(producto);
            window.location.href = 'Carrito.html';
        });
    });
    // Ir al carrito
    const goToCart = document.getElementById('go-to-cart');
    if (goToCart) {
        goToCart.addEventListener('click', () => {
            window.location.href = 'Carrito.html';
        });
    }

// Clonación del carrusel (segura)
    document.querySelectorAll('.carousel-track').forEach(track => {
        if (!track.dataset.cloned) {
            const items = Array.from(track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
            track.dataset.cloned = "true";
        }
    });
});
// Función de carrito SIN agrupar
function agregarAlCarritoSinAgrupar(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto); // siempre se agrega como producto nuevo
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
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


