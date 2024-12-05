// script.js

// Función para cargar los podcasts
async function fetchPodcasts() {
    const url = "https://reoobot.github.io/PostcaData/data.json"; // URL de la API
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar los datos: ${response.status}`);
        }
        const data = await response.json();
        displayPodcasts(data);
    } catch (error) {
        document.getElementById("podcast-list").textContent = "Error al cargar los podcasts.";
        console.error(error);
    }
}

// Función para mostrar los podcasts en el carrusel
function displayPodcasts(data) {
    const carousel = document.getElementById("carousel");
    carousel.innerHTML = ""; // Limpiar contenido previo

    if (Array.isArray(data)) {
        data.forEach(podcast => {
            const item = document.createElement("div");
            item.className = "carousel-item"; // Clase para cada ítem del carrusel

            // Verificar si hay una imagen y usarla
            const img = document.createElement("img");
            img.src = `https://reoobot.github.io/PostcaData${podcast.img}`; // Ruta de la imagen
            img.alt = podcast.name;

            // Crear el contenedor de los detalles del podcast
            const details = document.createElement("div");
            details.className = "details";

            const title = document.createElement("h3");
            title.textContent = podcast.name;

            const description = document.createElement("p");
            description.textContent = podcast.description;

            details.appendChild(title);
            details.appendChild(description);

            // Añadir eventos al hacer clic en el podcast
            item.addEventListener("click", () => {
                showPodcastDetails(podcast); // Mostrar detalles del podcast
            });

            item.appendChild(img);
            item.appendChild(details);
            carousel.appendChild(item);
        });

        startCarouselAnimation(); // Iniciar animación del carrusel
    } else {
        document.getElementById("podcast-list").textContent = "No hay podcasts disponibles.";
    }
}
// Función para mostrar los podcasts
function displayPodcasts(data) {
    const podcastList = document.getElementById("podcast-list");
    podcastList.innerHTML = ""; // Limpiar contenido previo

    if (data && Array.isArray(data)) {
        data.forEach(podcast => {
            const podcastDiv = document.createElement("div");
            podcastDiv.className = "podcast";

            const img = document.createElement("img");
            img.src = podcast.img.startsWith("/") ? `https://reoobot.github.io/PostcaData${podcast.img}` : podcast.img;
            img.alt = podcast.name;

            const details = document.createElement("div");
            details.className = "details";

            const name = document.createElement("h3");
            name.textContent = podcast.name;

            const description = document.createElement("p");
            description.textContent = podcast.description;

            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = podcast.src.startsWith("/") ? `https://reoobot.github.io/PostcaData${podcast.src}` : podcast.src;

            details.appendChild(name);
            details.appendChild(description);
            details.appendChild(audio);
            podcastDiv.appendChild(img);
            podcastDiv.appendChild(details);
            podcastList.appendChild(podcastDiv);
        });
    } else {
        podcastList.textContent = "No hay podcasts disponibles.";
    }
}

// Llamar a la función al cargar la página
fetchPodcasts();

// Función para el botón de reproducción (play button)
function playAudio() {
    console.log('Botón de reproducción clickeado');
    const audio = new Audio('https://reoobot.github.io/RadiOline/La%20bendici%C3%B3n%20%E2%94%82%20Elevation%20Worship%20(COVER)%20Espa%C3%B1ol%20BetEl%20al%20Mundo%20e%20invitados.mp3'); // Reemplaza con la URL de tu audio
    audio.play().then(() => {
        console.log('Reproducción de audio iniciada');
    }).catch((error) => {
        console.error('Error al reproducir el audio:', error);
    });
}

// Crear un reproductor de audio global
const audioPlayer = new Audio();
let isPlaying = false; // Estado de reproducción
let currentSrc = ""; // Fuente actual en reproducción

function playAudio() {
    const button = event.currentTarget; // Obtener el botón que fue clickeado
    const audioSrc = button.getAttribute('data-audio-src'); // Obtener la fuente del audio desde un atributo personalizado

    if (!audioSrc) {
        console.error("No se encontró una fuente de audio en el botón.");
        return;
    }

    // Si el audio ya está reproduciéndose y es el mismo, detenerlo
    if (isPlaying && currentSrc === audioSrc) {
        audioPlayer.pause();
        isPlaying = false;
        console.log("Audio pausado");
        button.innerHTML = '<i class="fas fa-play"></i>'; // Cambiar ícono a "play"
    } else {
        // Si es una nueva fuente o el audio está detenido, reiniciar
        audioPlayer.src = audioSrc;
        audioPlayer.play();
        isPlaying = true;
        currentSrc = audioSrc;
        console.log("Reproducción iniciada");
        button.innerHTML = '<i class="fas fa-pause"></i>'; // Cambiar ícono a "pausa"
    }

    // Agregar evento para manejar el fin de la reproducción
    audioPlayer.onended = () => {
        isPlaying = false;
        button.innerHTML = '<i class="fas fa-play"></i>'; // Cambiar ícono a "play" al finalizar
        console.log("Reproducción terminada");
    };
}




// Toggle menu visibility
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
