var music = document.getElementById('bg-music-carta');

try {
    var savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    var wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    if (music && savedTime > 0) {
        music.currentTime = savedTime;
    }
    
    if (wasPlaying && music) {
        music.play().catch(function() {});
    }
} catch(e) {}

setInterval(function() {
    if (music && !music.paused) {
        try {
            localStorage.setItem('musicTime', music.currentTime);
            localStorage.setItem('musicPlaying', 'true');
        } catch(e) {}
    }
}, 1000);

document.addEventListener('click', function() {
    if (music && music.paused) {
        music.play().catch(function() {});
        try {
            localStorage.setItem('musicPlaying', 'true');
        } catch(e) {}
    }
});

function apagarVela() {
    var flame = document.getElementById('flame-wish');
    var button = document.getElementById('wishButton');
    var message = document.getElementById('wishMessage');
    
    if (!flame || button.disabled) return;
    
    button.disabled = true;
    button.style.opacity = '0';
    button.style.transform = 'scale(0.5)';
    button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(function() {
        button.style.display = 'none';
    }, 500);
    
    flame.classList.add('apagada');
    
    setTimeout(function() {
        flame.style.display = 'none';
        message.style.display = 'block';
        
        setTimeout(function() {
            window.location.href = "index.html";
        }, 5000);
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    var title = document.querySelector('.letter-content h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-15px)';
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(function() {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 400);
    }
    
    var subtitle = document.querySelector('.letter-content h2');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateX(-20px)';
        subtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(function() {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateX(0)';
        }, 700);
    }

    var wishButton = document.getElementById('wishButton');
    if (wishButton) {
        wishButton.addEventListener('click', apagarVela);
    }
});