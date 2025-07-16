/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        const item = e.target.closest(".item");
        if (!item) return;

        // --- Click en imagen: solo guarda en localStorage ---
        if (e.target.tagName === "IMG") {
            const producto = {
                id: item.dataset.id,
                nombre: item.dataset.title,
                descripcion: item.dataset.description,
                precio: item.dataset.price,
                imagen: e.target.src
            };

            // Guardar detalle del producto
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

            // Redirigir a Details.html
            window.location.href = "Details.html";
        }
    });
});


