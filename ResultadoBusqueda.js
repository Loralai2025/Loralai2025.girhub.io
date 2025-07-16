/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorResultados");
    const sinResultados = document.getElementById("sinResultados");
    const palabraClave = localStorage.getItem("busqueda");

    if (!palabraClave) {
        sinResultados.style.display = "block";
        return;
    }

    const cargarHTML = async (url) => {
        const response = await fetch(url);
        const html = await response.text();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv;
    };

    cargarHTML("ProductSecret.html").then((productosDOM) => {
        const resultados = productosDOM.querySelectorAll("[data-title]");
        const coincidencias = Array.from(resultados).filter(el =>
            el.getAttribute("data-title").toLowerCase().includes(palabraClave.toLowerCase())
        );

        if (coincidencias.length === 0) {
            sinResultados.style.display = "block";
            return;
        }

        const contenedorCoincidencias = document.createElement("div");
        contenedorCoincidencias.innerHTML = "<h2>RESULTADOS DE BÚSQUEDA</h2>";
        contenedorCoincidencias.classList.add("bloque-productos");

        coincidencias.forEach(el => contenedorCoincidencias.appendChild(el.cloneNode(true)));

        contenedor.appendChild(contenedorCoincidencias);
    }).catch(err => {
        console.error("Error al cargar contenido:", err);
        sinResultados.style.display = "block";
    });
});

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