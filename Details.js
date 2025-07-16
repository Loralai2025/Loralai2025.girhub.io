/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    const sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

    if (!producto) {
        alert("No se encontró el producto.");
        window.location.href = "ResultadoBusqueda.html";
        return;
    }

    // Mostrar producto principal
    document.getElementById("detalle-titulo").textContent = producto.nombre;
    document.getElementById("detalle-descripcion").textContent = producto.descripcion;
    document.getElementById("detalle-precio").textContent = "S/ " + producto.precio;
    document.getElementById("detalle-imagen").src = producto.imagen;

    // Añadir al carrito (producto principal)
    document.getElementById("add-to-cart").addEventListener("click", () => {
        agregarAlCarrito(producto);
        mostrarNotificacion("Producto añadido al carrito");
    });

    // Cargar sugerencias relacionadas
    const contenedorSugerencias = document.getElementById("sugerencias-container");

    sugerencias.forEach(sug => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.dataset.id = sug.id;
        div.dataset.title = sug.nombre;
        div.dataset.description = sug.descripcion;
        div.dataset.price = sug.precio;

        div.innerHTML = `
            <img src="${sug.imagen}" alt="${sug.nombre}">
            <p>${sug.nombre}</p>
            <button class="add-to-cart">Añadir al carrito</button>
        `;

        contenedorSugerencias.appendChild(div);
    });

    // Delegación para clicks en sugerencias
    document.body.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;

    // --- Clic en "Añadir al carrito" ---
    if (e.target.classList.contains("add-to-cart")) {
        const prod = {
            id: item.dataset.id,
            nombre: item.dataset.title,
            descripcion: item.dataset.description,
            precio: parseFloat(item.dataset.price.replace("$", "")) || 0,
            imagen: item.querySelector("img").src,
            cantidad: 1
        };

        agregarAlCarrito(prod);
        mostrarNotificacion("Producto añadido al carrito");
    }

    // --- Clic en imagen de sugerencia para hacer swap con el producto principal ---
    if (e.target.tagName === "IMG") {

        const productoPrincipal = {
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen
        };

        // Nueva sugerencia seleccionada
        const nuevoProducto = {
            id: item.dataset.id,
            nombre: item.dataset.title,
            descripcion: item.dataset.description,
            precio: item.dataset.price,
            imagen: item.querySelector("img").src
        };

        // --- Intercambio en variables ---
        producto.id = nuevoProducto.id;
        producto.nombre = nuevoProducto.nombre;
        producto.descripcion = nuevoProducto.descripcion;
        producto.precio = nuevoProducto.precio;
        producto.imagen = nuevoProducto.imagen;

        // --- Actualiza la vista del detalle principal ---
        document.getElementById("detalle-titulo").textContent = producto.nombre;
        document.getElementById("detalle-descripcion").textContent = producto.descripcion;
        document.getElementById("detalle-precio").textContent = "S/ " + producto.precio;
        document.getElementById("detalle-imagen").src = producto.imagen;

        // --- Intercambio en el DOM de sugerencias ---
        item.dataset.id = productoPrincipal.id;
        item.dataset.title = productoPrincipal.nombre;
        item.dataset.description = productoPrincipal.descripcion;
        item.dataset.price = productoPrincipal.precio;
        item.querySelector("img").src = productoPrincipal.imagen;
        item.querySelector("p").textContent = productoPrincipal.nombre;

        // --- Actualiza localStorage ---
        const nuevasSugerencias = sugerencias.map(sug =>
            sug.id === nuevoProducto.id ? productoPrincipal : sug
        );

        localStorage.setItem("sugerencias", JSON.stringify(nuevasSugerencias));
        localStorage.setItem("productoDetalle", JSON.stringify(producto));
    }
});



    // Función de carrito
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existente = carrito.find(p => p.id === producto.id);

        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Notificación
    function mostrarNotificacion(mensaje) {
        const notif = document.getElementById("notification");
        notif.innerHTML = `
            <span>${mensaje}</span>
            <button id="go-to-cart">Ir al carrito</button>
        `;
        notif.style.display = "flex";

        document.getElementById("go-to-cart").onclick = () => {
            window.location.href = "Carrito.html";
        };

        setTimeout(() => {
            notif.style.display = "none";
        }, 5000);
    }


// --- ICONO DE USUARIO Y MODAL ---
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
