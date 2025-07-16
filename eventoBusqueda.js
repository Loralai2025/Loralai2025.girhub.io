document.addEventListener("DOMContentLoaded", () => {

    // Función global de notificación (usa tu diseño azul)
    function mostrarNotificacion(mensaje) {
        const notification = document.getElementById("notification");

        if (notification) {
            notification.innerHTML = `
                <span>${mensaje}</span>
                <button id="go-to-cart">Ir al carrito</button>
            `;

            notification.style.display = "flex";

            const goToCart = document.getElementById("go-to-cart");
            if (goToCart) {
                goToCart.onclick = () => {
                    window.location.href = "Carrito.html";
                };
            }

            setTimeout(() => {
                notification.style.display = "none";
            }, 5000);
        }
    }

    // Delegación para clicks en imágenes y botones
    document.body.addEventListener("click", (e) => {
        const item = e.target.closest(".item");
        if (!item) return;

        // --- Click en imagen: redirige a Details.html ---
        if (e.target.tagName === "IMG") {
            const producto = {
                id: item.dataset.id,
                nombre: item.dataset.title,
                descripcion: item.dataset.description,
                precio: item.dataset.price,
                imagen: e.target.src
            };

            localStorage.setItem("productoDetalle", JSON.stringify(producto));

            // Guardar sugerencias (todos los productos menos el clickeado)
            const todosLosItems = document.querySelectorAll(".item");
            const sugerencias = Array.from(todosLosItems)
                .filter(el => el !== item)
                .map(el => ({
                    id: el.dataset.id,
                    nombre: el.dataset.title,
                    descripcion: el.dataset.description,
                    precio: el.dataset.price,
                    imagen: el.querySelector("img").src
                }));

            localStorage.setItem("sugerencias", JSON.stringify(sugerencias));

            window.location.href = "Details.html";
        }

        // --- Click en botón "Añadir al carrito" ---
        if (e.target.classList.contains("add-to-cart")) {
            const producto = {
                id: item.dataset.id,
                nombre: item.dataset.title,
                descripcion: item.dataset.description,
                precio: parseFloat(item.dataset.price.replace("$", "")) || 0,
                imagen: item.querySelector("img").src,
                cantidad: 1
            };

            // Agregar al carrito
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const existente = carrito.find(p => p.id === producto.id);

            if (existente) {
                existente.cantidad += producto.cantidad;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Mostrar notificación unificada
            mostrarNotificacion("Producto añadido al carrito");
        }
    });

});
