const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let ki = 100;

// Configuración del Jugador (Goku)
const goku = {
    x: 50,
    y: canvas.height / 2,
    w: 60,
    h: 80,
    speed: 7,
    color: '#FF9800' // Color representativo del traje
};

let bullets = [];
let enemies = [];

// Función para disparar Ki
function shootKi() {
    if (ki >= 10) {
        bullets.push({ x: goku.x + goku.w, y: goku.y + goku.h / 2, size: 10, speed: 10 });
        ki -= 10;
        updateUI();
    }
}

function updateUI() {
    document.getElementById('ki-bar').innerText = ki;
    document.getElementById('score').innerText = score;
}

// Generar enemigos (Saibamans o soldados de Freezer)
function spawnEnemy() {
    enemies.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        w: 40,
        h: 40,
        speed: 3 + Math.random() * 4
    });
}

// Ciclo Principal de Juego
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Goku (Placeholder)
    ctx.fillStyle = goku.color;
    ctx.fillRect(goku.x, goku.y, goku.w, goku.h);
    ctx.fillStyle = 'blue'; // Cabello
    ctx.fillRect(goku.x, goku.y - 10, goku.w, 20);

    // Mover y dibujar ráfagas de Ki
    bullets.forEach((b, index) => {
        b.x += b.speed;
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
        if (b.x > canvas.width) bullets.splice(index, 1);
    });

    // Mover y dibujar enemigos
    enemies.forEach((e, ei) => {
        e.x -= e.speed;
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(e.x, e.y, e.w, e.h);

        // Colisión Ki vs Enemigo
        bullets.forEach((b, bi) => {
            if (b.x < e.x + e.w && b.x + b.size > e.x && b.y < e.y + e.h && b.y + b.size > e.y) {
                enemies.splice(ei, 1);
                bullets.splice(bi, 1);
                score++;
                if (ki < 100) ki += 5;
                updateUI();
            }
        });

        if (e.x < 0) enemies.splice(ei, 1);
    });

    requestAnimationFrame(update);
}

// Controles Táctiles
document.getElementById('btn-up').ontouchstart = () => { if(goku.y > 0) goku.y -= 30; };
document.getElementById('btn-down').ontouchstart = () => { if(goku.y < canvas.height - goku.h) goku.y += 30; };
document.getElementById('btn-shoot').ontouchstart = () => { shootKi(); };

// Iniciar
setInterval(spawnEnemy, 2000);
update();
