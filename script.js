// 1. Accedemos a los elementos del HTML
let botonBuscar = document.querySelector('.botonBuscar');
let ciudadInput = document.querySelector('.ciudadInput');
let temperatura = document.querySelector('.temperatura');

// 🔹 Al cargar la página, revisamos si hay una ciudad guardada en localStorage
window.addEventListener('load', function() {
    let ciudadGuardada = localStorage.getItem('ultimaCiudad');
    if (ciudadGuardada) {
        ciudadInput.value = ciudadGuardada; // Mostramos la ciudad en el input
        consultarClima(ciudadGuardada);     // Consultamos automáticamente
    }
});

// 2. Escuchamos cuando el usuario hace clic en el botón
botonBuscar.addEventListener('click', function() {
    let ciudad = ciudadInput.value.trim();

    if (ciudad === '') {
        alert('Por favor, ingresa una ciudad.');
        return;
    }
    
    // Consultamos el clima
    consultarClima(ciudad);
});

// 3. Función para consultar el clima usando la API
function consultarClima(ciudad) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=bb6f648b779f54d06995b306bc76d130`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarTemperatura(datos))
        .catch(error => {
            console.error('Error al consultar la API:', error);
            alert('No se encontró la ciudad. Intenta con otra.');
        });
}

// 4. Función para mostrar la temperatura en la página
function mostrarTemperatura(datosClima) {
    if (datosClima.cod === 200) {
        // Guardamos la ciudad en localStorage
        localStorage.setItem('ultimaCiudad', datosClima.name);

        // Si la ciudad es válida, mostramos la temperatura
        temperatura.innerText = `La temperatura en ${datosClima.name} es de ${datosClima.main.temp}°C`;
    } else {
        // Si la ciudad no es válida, mostramos un mensaje personalizado
        if (datosClima.cod == 404) {
            temperatura.innerText = `No se pudo obtener la temperatura de la ciudad: ${ciudadInput.value}`;
        } else {
            temperatura.innerText = 'No se pudo obtener la temperatura. Intenta con otra ciudad.';
        }
    }
}

