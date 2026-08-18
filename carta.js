function crearGlobosVerticales() {
    var container = document.getElementById('globos-container');
    if (!container) return;
    
    var emojis = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
    var cantidad = 25;
    
    for (var i = 0; i < cantidad; i++) {
        var globo = document.createElement('div');
        globo.className = 'globos-vertical';
        globo.textContent = emojis[i % emojis.length];
        
        var posX = Math.random() * 95 + 2;
        globo.style.setProperty('--pos-x', posX + '%');
        
        var delay = Math.random() * 12;
        globo.style.setProperty('--delay', delay + 's');
        
        var size = 35 + Math.random() * 40;
        globo.style.fontSize = size + 'px';
        
        var duration = 10 + Math.random() * 10;
        globo.style.animationDuration = duration + 's';
        
        container.appendChild(globo);
    }
}

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
        
        try {
            if (music && !music.paused) {
                localStorage.setItem('musicTime', music.currentTime);
                localStorage.setItem('musicPlaying', 'true');
            }
        } catch(e) {}
        
        setTimeout(function() {
            window.location.href = "index.html";
        }, 5000);
    }, 600);
}
function goBack() {
    try {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
            localStorage.setItem('musicPlaying', 'true');
        }
    } catch(e) {}
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function() {
    // Crear globos verticales
    crearGlobosVerticales();
    
    // Animación del título
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