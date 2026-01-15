let diaActual = "Domingo";
let baseDatos = JSON.parse(localStorage.getItem('cantoral_db')) || {};

// Al cargar la página
window.onload = () => {
    cambiarDia('Domingo');
};

function cambiarDia(dia) {
    diaActual = dia;
    document.getElementById('dia-titulo').innerText = "Cantos: " + dia;
    renderizarCantos();
}

// Lógica de Administrador: Guardar Canto y Archivo
function subirCanto() {
    const nombre = document.getElementById('nombre-canto').value;
    const archivoInput = document.getElementById('archivo-canto');
    
    if (!nombre) return alert("Escribe el nombre del momento (Ej: Entrada)");

    const reader = new FileReader();
    
    if (archivoInput.files[0]) {
        reader.readAsDataURL(archivoInput.files[0]);
        reader.onload = function () {
            guardarEnDB(nombre, reader.result, archivoInput.files[0].type);
        };
    } else {
        guardarEnDB(nombre, null, null);
    }
}

function guardarEnDB(nombre, fileData, type) {
    if (!baseDatos[diaActual]) baseDatos[diaActual] = [];
    
    baseDatos[diaActual].push({
        id: Date.now(),
        nombre: nombre,
        archivo: fileData, // Base64 del PDF o Imagen
        tipo: type
    });

    localStorage.setItem('cantoral_db', JSON.stringify(baseDatos));
    renderizarCantos();
    document.getElementById('nombre-canto').value = "";
}

// Lógica de Público: Ver Cantos
function renderizarCantos() {
    const contenedor = document.getElementById('lista-publica');
    contenedor.innerHTML = "";
    
    const cantos = baseDatos[diaActual] || [];
    
    if (cantos.length === 0) {
        contenedor.innerHTML = "<p>No hay cantos cargados para este día.</p>";
        return;
    }

    cantos.forEach(c => {
        const div = document.createElement('div');
        div.className = "item-canto";
        div.innerHTML = `
            <span><strong>${c.nombre}</strong></span>
            ${c.archivo ? `<button class="btn-file" onclick="verArchivo('${c.id}')"><i class="fas fa-file-pdf"></i> Ver</button>` : ''}
            <button onclick="borrarCanto('${c.id}')" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
        `;
        contenedor.appendChild(div);
    });
}

function verArchivo(id) {
    const canto = baseDatos[diaActual].find(c => c.id == id);
    const modal = document.getElementById('modal-visor');
    const body = document.getElementById('modal-body');
    
    modal.style.display = "block";
    
    if (canto.tipo === "application/pdf") {
        body.innerHTML = `<embed src="${canto.archivo}" type="application/pdf" width="100%" height="600px" />`;
    } else {
        body.innerHTML = `<img src="${canto.archivo}" style="width:100%" />`;
    }
}

function cerrarModal() {
    document.getElementById('modal-visor').style.display = "none";
}

function borrarCanto(id) {
    baseDatos[diaActual] = baseDatos[diaActual].filter(c => c.id != id);
    localStorage.setItem('cantoral_db', JSON.stringify(baseDatos));
    renderizarCantos();
}

function compartirWhatsApp() {
    const cantos = baseDatos[diaActual] || [];
    let texto = `*CANTORAL LITÚRGICO - ${diaActual.toUpperCase()}*%0A%0A`;
    
    cantos.forEach(c => {
        texto += `• ${c.nombre}${c.archivo ? ' (📄 Ver en la web)' : ''}%0A`;
    });
    
    window.open(`https://wa.me/?text=${texto}`, '_blank');
}    // Abrir WhatsApp directamente con la lista armada
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
