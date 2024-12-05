// Función para cargar los podcasts
async function fetchPodcasts() {
    const url = "https://reoobot.github.io/PostcaData/data.json"; // URL del archivo JSON
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar los datos: ${response.status}`);
        }
        const data = await response.json();
        displayPodcasts(data); // Mostrar los podcasts
    } catch (error) {
        console.error("Error al cargar los podcasts:", error);
        document.getElementById("podcast-list").textContent = "Error al cargar los podcasts.";
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

// Función para mostrar los detalles de un podcast cuando se hace clic en él
function showPodcastDetails(podcast) {
    const footer = document.getElementById("podcast-footer");
    const title = document.getElementById("program-title");
    const description = document.getElementById("program-description");
    const seasonList = document.getElementById("season-list");
    const audioPlayer = document.getElementById("audio-player");

    // Mostrar título y descripción del podcast
    title.textContent = podcast.name;
    description.textContent = podcast.description;
    seasonList.innerHTML = ""; // Limpiar lista de temporadas

    // Mostrar temporadas y episodios
    podcast.seasons.forEach(season => {
        const seasonDiv = document.createElement("div");
        seasonDiv.className = "season";
        const seasonTitle = document.createElement("h4");
        seasonTitle.textContent = `Temporada ${season.number}`;
        seasonDiv.appendChild(seasonTitle);

        season.episodes.forEach(episode => {
            const episodeDiv = document.createElement("div");
            episodeDiv.className = "episode";

            episodeDiv.innerHTML = `
                <img src="https://reoobot.github.io/PostcaData${episode.img}" alt="${episode.title}" class="episode-img">
                <div class="episode-info">
                    <h5>${episode.title}</h5>
                    <p>${episode.capitulo}</p>
                </div>
            `;

            // Reproducir el episodio al hacer clic
            episodeDiv.addEventListener("click", () => {
                audioPlayer.src = `https://reoobot.github.io/PostcaData${episode.audio}`; // Reemplazar la fuente de audio
                audioPlayer.load(); // Cargar el nuevo audio
                audioPlayer.play(); // Reproducir automáticamente
            });

            seasonDiv.appendChild(episodeDiv);
        });

        seasonList.appendChild(seasonDiv);
    });

    // Hacer visible el pie de página
    footer.style.display = "flex";
}

// Función para iniciar la animación del carrusel (moverse automáticamente)
let currentIndex = 0;
function startCarouselAnimation() {
    const carousel = document.getElementById("carousel");
    const items = document.querySelectorAll(".carousel-item");

    setInterval(() => {
        if (items.length === 0) return;
        const totalItems = items.length;
        const itemWidth = items[0].offsetWidth + 20; // Ajuste para el espaciado
        const newTransform = -(currentIndex * itemWidth);

        carousel.style.transform = `translateX(${newTransform}px)`;
        currentIndex = (currentIndex + 1) % totalItems;
    }, 2000); // 5 segundos de intervalo
}

// Función para cerrar el pie de página (reproductor)
document.getElementById("close-player").addEventListener("click", () => {
    document.getElementById("podcast-footer").style.display = "none";
});

// Llamada inicial para cargar los podcasts
fetchPodcasts();

// Toggle menu visibility
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

