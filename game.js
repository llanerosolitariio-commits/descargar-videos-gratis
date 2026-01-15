let diaSeleccionado = "";

function seleccionarDia(dia) {
    diaSeleccionado = dia;
    document.getElementById('dia-titulo').innerText = "Cantos para el " + dia;
    // Efecto visual de selección
    const planilla = document.getElementById('planificador');
    planilla.style.borderLeft = "10px solid #D4AF37";
}

function compartirLista() {
    if (!diaSeleccionado) {
        alert("Por favor, selecciona primero un día de la semana.");
        return;
    }

    const entrada = document.getElementById('entrada').value || "No asignado";
    const piedad = document.getElementById('piedad').value || "No asignado";
    const gloria = document.getElementById('gloria').value || "No asignado";
    const salmo = document.getElementById('salmo').value || "No asignado";
    const ofertorio = document.getElementById('ofertorio').value || "No asignado";
    const santo = document.getElementById('santo').value || "No asignado";
    const comunion = document.getElementById('comunion').value || "No asignado";
    const salida = document.getElementById('salida').value || "No asignado";

    const mensaje = `🎶 *Lista de Cantos - ${diaSeleccionado}* 🎶%0A%0A` +
        `⛪ *Entrada:* ${entrada}%0A` +
        `🙏 *Piedad:* ${piedad}%0A` +
        `✨ *Gloria:* ${gloria}%0A` +
        `📖 *Salmo:* ${salmo}%0A` +
        `🍞 *Ofertorio:* ${ofertorio}%0A` +
        `😇 *Santo:* ${santo}%0A` +
        `🍷 *Comunión:* ${comunion}%0A` +
        `🚶 *Salida:* ${salida}%0A%0A` +
        `_¡Cantemos con alegría al Señor!_`;

    // Abrir WhatsApp directamente con la lista armada
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
}        };

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
