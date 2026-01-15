const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

// 1. Función que "hace clic" en el sistema de archivos
function openPicker(type) {
    fileInput.accept = type; // Filtra por imagen, video o audio
    fileInput.click(); // Esto lanza la ventana de permisos del celular
}

// 2. Función que recibe los archivos una vez que das permiso
function handleFiles(files) {
    fileList.innerHTML = ""; // Limpiar lista anterior

    if (files.length === 0) {
        fileList.innerHTML = "<p>No seleccionaste nada.</p>";
        return;
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        
        // Creamos la fila para cada archivo
        const item = document.createElement('div');
        item.className = 'file-item';
        
        const info = document.createElement('div');
        info.innerHTML = `<strong>${file.name}</strong><br><small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>`;
        
        const btn = document.createElement('button');
        btn.className = 'btn-ver';
        btn.innerText = "Abrir";
        
        // Al hacer clic en abrir, generamos una URL temporal para ver el archivo
        btn.onclick = () => {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        };

        item.appendChild(info);
        item.appendChild(btn);
        fileList.appendChild(item);
    });
}            <small>Descargar</small>
        `;
        display.appendChild(card);
    }
}

// Iniciar al cargar
window.onload = getAccess;        ]
    },
    'emergency': {
        titulo: "Aviso de Emergencia",
        pasos: [
            "⚠️ Si te sientes mal o necesitas ayuda urgente:",
            "1. Pulsa el botón rojo de abajo.",
            "2. Esto enviará un mensaje avisando a tu familia.",
            "3. Mantén la calma y espera a que te llamen."
        ]
    }
};

// Función para mostrar la guía en pantalla
function showStep(id) {
    const box = document.getElementById('instruction-box');
    const title = document.getElementById('step-title');
    const text = document.getElementById('step-text');
    
    // Obtenemos la información del diccionario
    const seleccion = guias[id];
    
    title.innerText = seleccion.titulo;
    
    // Convertimos los pasos en una lista fácil de leer
    text.innerHTML = seleccion.pasos.map(paso => `<p>🔹 ${paso}</p>`).join('');
    
    // Mostramos el cuadro con una animación sencilla
    box.style.display = 'block';
    box.style.animation = 'fadeIn 0.5s';
    
    // Si el celular tiene activada la lectura de voz, lee el título
    if ('speechSynthesis' in window) {
        const mensaje = new SpeechSynthesisUtterance(seleccion.titulo);
        mensaje.lang = 'es-ES';
        window.speechSynthesis.speak(mensaje);
    }

    // Desliza la pantalla hacia abajo para que vean la guía
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// Función para cerrar el cuadro de ayuda
function closeBox() {
    const box = document.getElementById('instruction-box');
    box.style.display = 'none';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Registro de log para verificar que el sistema cargó bien
console.log("Sistema de Guía para Mayores cargado correctamente.");// Generar enemigos (Saibamans o soldados de Freezer)
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
