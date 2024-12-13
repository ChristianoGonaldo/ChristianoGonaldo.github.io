const starter = document.getElementById('start');
const setter = document.getElementById('setNames');
starter.style.display = 'none';
setter.style.display = 'none';

let horseNames = [];

document.getElementById('close-btn').addEventListener('click', trackCreator);

function trackCreator() {
    const main = document.querySelector('main');
    main.style.border = '10px dashed white';
    main.style.background = 'repeating-linear-gradient(90deg, black 0, black 10px, white 10px, white 20px)';

    starter.style.display = "";
    setter.style.display = "";
    const input = document.getElementById('user-input');
    const horseCount = parseInt(input.value);

    if (isNaN(horseCount) || horseCount < 2 || horseCount > 10) {
        alert('Por favor, introduce un número válido entre 2 y 10.');
        popupOverlay.style.display = 'block';
        return;
    }

    document.getElementById('popup-overlay').style.display = 'none';

    main.innerHTML = '';

    horseNames = [];
    for (let i = 1; i <= horseCount; i++) {
        const track = document.createElement('div');
        track.className = 'track';

        const horse = document.createElement('div');
        horse.id = `horse${i}`;
        horse.className = 'horse';
        horse.innerHTML = '🐎';

        track.appendChild(horse);
        main.appendChild(track);

        horseNames.push(`Caballo ${i}`);
    }
}

function setHorseNames() {
    for (let i = 0; i < horseNames.length; i++) {
        const name = prompt(`Ingresa el nombre para el ${i + 1}° caballo (actual: ${horseNames[i]}):`, horseNames[i]);
        if (name) {
            horseNames[i] = name;
        }
    }
    alert('¡Nombres actualizados!');
}

function startRace() {
    starter.style.display = 'none';
    setter.style.display = 'none';
    const horses = horseNames.map((_, i) => document.getElementById(`horse${i + 1}`));
    horses.forEach(horse => horse.style.left = '0px');

    const track = document.querySelector('.track');

    const raceInterval = setInterval(() => {
        let finished = false;
        horses.forEach((horse, index) => {
            const currentPos = parseInt(horse.style.left || '0');
            const newPos = currentPos + Math.random() * 10;
            horse.style.left = newPos + 'px';

            if (newPos >= track.offsetWidth - 40) {
                mostrarNotificacionGanador(horseNames[index]);

                clearInterval(raceInterval);
                finished = true;
            }
        });

        if (finished) {
            clearInterval(raceInterval);
        }
    }, 50);
}
document.addEventListener('keydown', e => {
    const popupOverlay = document.getElementById('popup-overlay');
    if (popupOverlay) {
        if (popupOverlay.style.display == 'none') return
        if (e.key === 'Enter') {
            popupOverlay.style.display = 'none';
            trackCreator();
        }
    }
});

function mostrarNotificacionGanador(name) {
    const notificacion = document.createElement('div');
    notificacion.style.position = 'fixed';
    notificacion.style.top = '50%';
    notificacion.style.left = '50%';
    notificacion.style.transform = 'translate(-50%, -50%)';
    notificacion.style.padding = '20px';
    notificacion.style.backgroundColor = '#4CAF50';
    notificacion.style.color = 'white';
    notificacion.style.borderRadius = '10px';
    notificacion.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    notificacion.style.textAlign = 'center';
    notificacion.style.zIndex = '1000';

    // Crear el mensaje de la notificación
    const mensaje = document.createElement('h2');
    mensaje.textContent = '¡Gana la carrera ' + name + '!';
    notificacion.appendChild(mensaje);

    // Crear el botón de cerrar
    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.style.marginTop = '15px';
    botonCerrar.style.padding = '10px 20px';
    botonCerrar.style.backgroundColor = 'white';
    botonCerrar.style.color = '#4CAF50';
    botonCerrar.style.border = 'none';
    botonCerrar.style.borderRadius = '5px';
    botonCerrar.style.cursor = 'pointer';

    // Función para cerrar la notificación
    botonCerrar.addEventListener('click', function () {
        notificacion.remove();
        starter.style.display = '';
        setter.style.display = '';
    });

    notificacion.appendChild(botonCerrar);

    // Añadir la notificación al cuerpo del documento
    document.body.appendChild(notificacion);
}

window.onload = function () {
    const input = document.getElementById('user-input');
    input.focus();
};