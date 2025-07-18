/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
function mostrarLogin() {
    document.getElementById('juego-section').style.display = 'none';
    document.getElementById('create-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.querySelector('.titulo').textContent = 'INICIAR SESIÓN';
}

function crearCuenta() {
    const email = document.getElementById('new-email').value.trim();
    const id = document.getElementById('new-id').value.trim();
    const pass = document.getElementById('new-password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.email === email || u.id === id)) {
        document.getElementById('mensaje').textContent = 'Correo o ID ya existe.';
        return;
    }

    usuarios.push({email, id, pass});
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('mensaje').textContent = 'Cuenta creada ✔️';

    document.getElementById('create-section').style.display = 'none';
    document.getElementById('juego-section').style.display = 'block';
    iniciarJuego();
}

function iniciarSesion() {
    const id = document.getElementById('login-id').value.trim();
    const pass = document.getElementById('login-password').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.id === id && u.pass === pass);

    if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        document.getElementById('mensaje').textContent = '¡Bienvenido!';

        // Cambiar botón (si tienes uno con id="login-btn")
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.removeAttribute('href');
            loginBtn.innerHTML = `
        <img src="cuenta.png" alt="Usuario" style="width: 28px; border-radius: 50%; vertical-align: middle; cursor: pointer;">
      `;
        }
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        document.getElementById('mensaje').textContent = 'Datos incorrectos.';
    }
}
function irAInicio() {
    window.location.href = 'index.html';
}

function cerrarSesion() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}

function iniciarJuego() {
    const canvas = document.getElementById("juegoCanvas");
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas al contenedor
    const contenedor = canvas.parentElement;
    canvas.width = contenedor.offsetWidth - 20;
    canvas.height = 200;

    let jugador = {x: 50, y: 160, vy: 0, ancho: 20, alto: 20, enSuelo: true};
    const gravedad = 0.9;

    const monedas = [
        {x: canvas.width * 0.25, y: 140, recogida: false},
        {x: canvas.width * 0.5, y: 100, recogida: false},
        {x: canvas.width * 0.75, y: 140, recogida: false}
    ];

    const plataformas = [
        {x: 0, y: 180, w: canvas.width, h: 20},
        {x: canvas.width * 0.45, y: 120, w: 80, h: 10}
    ];

    let teclas = {};
    let puntos = 0;

    document.addEventListener("keydown", e => teclas[e.key] = true);
    document.addEventListener("keyup", e => teclas[e.key] = false);

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Plataformas
        ctx.fillStyle = "#888";
        plataformas.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

        // Jugador
        ctx.fillStyle = "red";
        ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

        // Monedas
        monedas.forEach(m => {
            if (!m.recogida) {
                ctx.fillStyle = "gold";
                ctx.beginPath();
                ctx.arc(m.x, m.y, 8, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
    }

    function actualizar() {
        // Movimiento lateral
        if (teclas["ArrowRight"])
            jugador.x += 3;
        if (teclas["ArrowLeft"])
            jugador.x -= 3;

        // Gravedad
        jugador.vy += gravedad;
        jugador.y += jugador.vy;
        jugador.enSuelo = false;

        // Colisión con plataformas
        plataformas.forEach(p => {
            if (
                    jugador.x + jugador.ancho > p.x &&
                    jugador.x < p.x + p.w &&
                    jugador.y + jugador.alto > p.y &&
                    jugador.y + jugador.alto < p.y + p.h + 10 &&
                    jugador.vy >= 0
                    ) {
                jugador.y = p.y - jugador.alto;
                jugador.vy = 0;
                jugador.enSuelo = true;
            }
        });

        // Saltar
        if (teclas["ArrowUp"] && jugador.enSuelo) {
            jugador.vy = -12;
            jugador.enSuelo = false;
        }

        // Recoger monedas
        monedas.forEach(m => {
            if (!m.recogida &&
                    jugador.x < m.x + 8 &&
                    jugador.x + jugador.ancho > m.x - 8 &&
                    jugador.y < m.y + 8 &&
                    jugador.y + jugador.alto > m.y - 8
                    ) {
                m.recogida = true;
                puntos++;
                document.getElementById('puntos').textContent = `Monedas: ${puntos}/3`;
                if (puntos === 3) {
                    document.getElementById("continuar-btn").style.display = "block";
                }
            }
        });

        dibujar();
        requestAnimationFrame(actualizar);
    }

    actualizar();
}
