
setTimeout(() => {
    const welcomeBox = document.getElementById('welcomeBox');
    welcomeBox.classList.add('animate__fadeOut');
    setTimeout(() => welcomeBox.style.display = 'none', 1000); 
}, 5000);