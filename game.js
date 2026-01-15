// CONFIGURACIÓN DE TU PROYECTO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCWG34w1Ka5lNQpydF3Q2Zf1_mGys0AgIk",
    authDomain: "cantoralparroquia-2f47d.firebaseapp.com",
    projectId: "cantoralparroquia-2f47d",
    storageBucket: "cantoralparroquia-2f47d.firebasestorage.app",
    messagingSenderId: "439889740361",
    appId: "1:439889740361:web:7a25051f56d9cb7e597598",
    measurementId: "G-BFSV83XDET"
};

// Inicializar Firebase (Versión Compat para que funcione con tu HTML)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

let diaActual = "Domingo";

// 1. Función para cambiar el día y escuchar la base de datos en tiempo real
function cambiarDia(dia) {
    diaActual = dia;
    document.getElementById('dia-titulo').innerText = "Cantos del " + dia;

    // Escuchamos los cambios en Firestore para el día seleccionado
    db.collection("cantos").doc(diaActual).collection("lista")
      .orderBy("fecha", "asc")
      .onSnapshot((querySnapshot) => {
        const contenedor = document.getElementById('lista-publica');
        contenedor.innerHTML = "";
        
        if (querySnapshot.empty) {
            contenedor.innerHTML = "<p style='text-align:center; color:#999;'>Aún no hay cantos para este día.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const c = doc.data();
            const div = document.createElement('div');
            div.className = "item-canto";
            div.innerHTML = `
                <div style="display:flex; flex-direction:column;">
                    <span style="font-weight:bold; color:#800000;">${c.nombre}</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    ${c.url ? `<button class="btn-file" onclick="window.open('${c.url}', '_blank')"><i class="fas fa-eye"></i> Ver</button>` : ''}
                    <button onclick="borrarCanto('${doc.id}')" style="background:none; border:none; color:#ddd; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
            `;
            contenedor.appendChild(div);
        });
    }, (error) => {
        console.error("Error al obtener datos: ", error);
    });
}

// 2. Función del Administrador para subir cantos y archivos
async function subirCanto() {
    const nombreInput = document.getElementById('nombre-canto');
    const archivoInput = document.getElementById('archivo-canto');
    const nombre = nombreInput.value;
    const archivo = archivoInput.files[0];
    const boton = document.querySelector('.btn-admin');
    
    if (!nombre) return alert("Por favor, escribe el momento del canto (ej: Entrada)");

    try {
        boton.disabled = true;
        boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';

        let urlFinal = null;

        if (archivo) {
            // Subir archivo al Storage de Firebase
            const storageRef = storage.ref(`documentos/${diaActual}/${Date.now()}_${archivo.name}`);
            const snapshot = await storageRef.put(archivo);
            urlFinal = await snapshot.ref.getDownloadURL();
        }

        // Guardar información en Firestore
        await db.collection("cantos").doc(diaActual).collection("lista").add({
            nombre: nombre,
            url: urlFinal,
            fecha: new Date()
        });

        // Limpiar formulario
        nombreInput.value = "";
        archivoInput.value = "";
        alert("¡Canto cargado correctamente!");

    } catch (error) {
        console.error("Error al subir:", error);
        alert("Hubo un error al subir. Verifica los permisos en la consola de Firebase.");
    } finally {
        boton.disabled = false;
        boton.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> SUBIR A LA NUBE';
    }
}

// 3. Función para borrar cantos
async function borrarCanto(id) {
    if(confirm("¿Quieres eliminar este canto de la lista pública?")) {
        try {
            await db.collection("cantos").doc(diaActual).collection("lista").doc(id).delete();
        } catch (error) {
            alert("Error al borrar: " + error);
        }
    }
}

// 4. Función para compartir en WhatsApp
function compartirWhatsApp() {
    const contenedor = document.getElementById('lista-publica');
    const items = contenedor.querySelectorAll('.item-canto span');
    
    if (items.length === 0) return alert("No hay cantos para compartir.");

    let texto = `*⛪ CANTORAL: ${diaActual.toUpperCase()}*%0A%0A`;
    items.forEach(item => {
        texto += `• ${item.innerText}%0A`;
    });
    texto += `%0A_Mira las partituras aquí: ${window.location.href}_`;
    
    window.open(`https://wa.me/?text=${texto}`, '_blank');
}

// Iniciar en Domingo por defecto
cambiarDia("Domingo");            `;
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
