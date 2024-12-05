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
        console.error("Error al cargar los podcasts:", error);
        document.getElementById("podcast-list").textContent = "Error al cargar los podcasts.";
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


function showPodcastDetails(podcast) {
    const footer = document.getElementById("podcast-footer");
    const title = document.getElementById("program-title");
    const description = document.getElementById("program-description");
    const seasonList = document.getElementById("season-list");
    const audioPlayer = document.getElementById("audio-player");

   
    title.textContent = podcast.name;
    description.textContent = podcast.description;
    seasonList.innerHTML = ""; 

 
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

            episodeDiv.addEventListener("click", () => {
                audioPlayer.src = `https://reoobot.github.io/PostcaData${episode.audio}`; 
                audioPlayer.load(); 
                audioPlayer.play(); 
            });

            seasonDiv.appendChild(episodeDiv);
        });

        seasonList.appendChild(seasonDiv);
    });

   
    footer.style.display = "flex";
}


let currentIndex = 0;
function startCarouselAnimation() {
    const carousel = document.getElementById("carousel");
    const items = document.querySelectorAll(".carousel-item");

    setInterval(() => {
        if (items.length === 0) return;
        const totalItems = items.length;
        const itemWidth = items[0].offsetWidth + 20; 
        const newTransform = -(currentIndex * itemWidth);

        carousel.style.transform = `translateX(${newTransform}px)`;
        currentIndex = (currentIndex + 1) % totalItems;
    }, 2000); 
}


document.getElementById("close-player").addEventListener("click", () => {
    document.getElementById("podcast-footer").style.display = "none";
});


fetchPodcasts();


const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

