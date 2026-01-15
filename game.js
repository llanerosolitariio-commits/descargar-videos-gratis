// CONFIGURACIÓN DE TU PROYECTO (Pega lo que copiaste de Firebase aquí)
const firebaseConfig = {
  apiKey: "AIzaSyCWG34w1Ka5lNQpydF3Q2Zf1_mGys0AgIk",
  authDomain: "cantoralparroquia-2f47d.firebaseapp.com",
  projectId: "cantoralparroquia-2f47d",
  storageBucket: "cantoralparroquia-2f47d.firebasestorage.app",
  messagingSenderId: "439889740361",
  appId: "T1:439889740361:web:7a25051f56d9cb7e597598"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

let diaActual = "Domingo";

// Cambiar de día y escuchar cambios en tiempo real
function cambiarDia(dia) {
    diaActual = dia;
    document.getElementById('dia-titulo').innerText = "Cantos: " + dia;
    
    // Aquí le pedimos a Firebase que nos avise si algo cambia en ese día
    db.collection("cantos").doc(diaActual).collection("lista")
      .onSnapshot((querySnapshot) => {
        const contenedor = document.getElementById('lista-publica');
        contenedor.innerHTML = "";
        
        querySnapshot.forEach((doc) => {
            const c = doc.data();
            const div = document.createElement('div');
            div.className = "item-canto";
            div.innerHTML = `
                <span><strong>${c.nombre}</strong></span>
                ${c.url ? `<button class="btn-file" onclick="window.open('${c.url}')"><i class="fas fa-file-pdf"></i> Ver</button>` : ''}
                <button onclick="borrarCanto('${doc.id}')" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
            `;
            contenedor.appendChild(div);
        });
    });
}

// Función para el Administrador (Subir a la nube)
async function subirCanto() {
    const nombre = document.getElementById('nombre-canto').value;
    const archivo = document.getElementById('archivo-canto').files[0];
    
    if (!nombre) return alert("Escribe el nombre del canto");

    let urlFinal = null;

    if (archivo) {
        // 1. Subir archivo a Firebase Storage
        const storageRef = storage.ref(`cantos/${diaActual}/${archivo.name}`);
        await storageRef.put(archivo);
        urlFinal = await storageRef.getDownloadURL();
    }

    // 2. Guardar datos en la base de datos Firestore
    await db.collection("cantos").doc(diaActual).collection("lista").add({
        nombre: nombre,
        url: urlFinal,
        fecha: new Date()
    });

    document.getElementById('nombre-canto').value = "";
    document.getElementById('archivo-canto').value = "";
    alert("¡Canto guardado para toda la comunidad!");
}

// Borrar para todos
async function borrarCanto(id) {
    if(confirm("¿Quieres eliminar este canto para todos?")) {
        await db.collection("cantos").doc(diaActual).collection("lista").doc(id).delete();
    }
}

// Iniciar
cambiarDia("Domingo");    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
