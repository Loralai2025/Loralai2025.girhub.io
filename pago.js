/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
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

