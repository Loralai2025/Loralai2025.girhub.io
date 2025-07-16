/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// --- BÚSQUEDA CON ENTER EN CAJA PRINCIPAL ---
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
let productos = [];

async function cargarProductos() {
    try {
        const urls = ["ProductSecret.html"];
        const respuestas = await Promise.all(urls.map(url => fetch(url).then(res => res.text())));
        respuestas.forEach(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const items = temp.querySelectorAll("[data-title]");
            items.forEach(item => {
                productos.push({
                    title: item.getAttribute("data-title"),
                    html: item.outerHTML
                });
            });
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

function mostrarSugerencias(texto) {
    const filtro = texto.toLowerCase();
    resultsList.innerHTML = "";

    const sugerencias = productos.filter(p =>
        p.title.toLowerCase().includes(filtro)
    );

    if (sugerencias.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No disponible";
        li.style.background = "#ff1744";
        li.style.color = "white";
        resultsList.appendChild(li);
    } else {
        sugerencias.slice(0, 5).forEach(p => {
            const li = document.createElement("li");
            li.textContent = p.title;
            li.style.cursor = "pointer";  // Cambia el cursor al pasar el mouse
            li.addEventListener("click", () => {
                localStorage.setItem("busqueda", p.title.toLowerCase());
                window.location.href = "ResultadoBusqueda.html";
            });
            resultsList.appendChild(li);
        });
    }
}


searchInput.addEventListener("input", () => {
    const texto = searchInput.value.trim();
    if (texto) {
        mostrarSugerencias(texto);
    } else {
        resultsList.innerHTML = "";
    }
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const palabraClave = searchInput.value.trim().toLowerCase();
        if (palabraClave) {
            localStorage.setItem("busqueda", palabraClave);
            window.location.href = "ResultadoBusqueda.html";
        }
    }
});
cargarProductos();

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


