async function fetchPodcasts() {
    const url = "https://reoobot.github.io/PostcaData/data.json"; 
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


function displayPodcasts(data) {
    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    if (Array.isArray(data)) {
        data.forEach(podcast => {
            const item = document.createElement("div");
            item.className = "carousel-item"; 

   
            const img = document.createElement("img");
            img.src = `https://reoobot.github.io/PostcaData${podcast.img}`; 
            img.alt = podcast.name;

        
            const details = document.createElement("div");
            details.className = "details";

            const title = document.createElement("h3");
            title.textContent = podcast.name;

            const description = document.createElement("p");
            description.textContent = podcast.description;

            details.appendChild(title);
            details.appendChild(description);

            item.addEventListener("click", () => {
                showPodcastDetails(podcast); 
            });

            item.appendChild(img);
            item.appendChild(details);
            carousel.appendChild(item);
        });

        startCarouselAnimation(); 
    } else {
        document.getElementById("podcast-list").textContent = "No hay podcasts disponibles.";
    }
}

function displayPodcasts(data) {
    const podcastList = document.getElementById("podcast-list");
    podcastList.innerHTML = ""; 

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
fetchPodcasts();
function playAudio() {
    console.log('Botón de reproducción clickeado');
    const audio = new Audio('https://upgrading-flush-holdem-indianapolis.trycloudflare.com/asamblea'); 
    audio.play().then(() => {
        console.log('Reproducción de audio iniciada');
        console.log(audio);
        
    }).catch((error) => {
        console.error('Error al reproducir el audio:', error);
    });
}
const audioPlayer = new Audio();
let isPlaying = false;
let currentSrc = ""; 

function playAudio() {
    const button = event.currentTarget; 
    const audioSrc = button.getAttribute('data-audio-src'); 

    if (!audioSrc) {
        console.error("No se encontró una fuente de audio en el botón.");
        return;
    }


    if (isPlaying && currentSrc === audioSrc) {
        audioPlayer.pause();
        isPlaying = false;
        console.log("Audio pausado");
        button.innerHTML = '<i class="fas fa-play"></i>'; 
    } else {
     
        audioPlayer.src = audioSrc;
        audioPlayer.play();
        isPlaying = true;
        currentSrc = audioSrc;
        console.log("Reproducción iniciada");
        button.innerHTML = '<i class="fas fa-pause"></i>'; 
    }


    audioPlayer.onended = () => {
        isPlaying = false;
        button.innerHTML = '<i class="fas fa-play"></i>'; 
        console.log("Reproducción terminada");
    };
}

const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});