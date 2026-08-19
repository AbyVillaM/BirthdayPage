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

function escribirMensaje(elemento, texto, velocidad, callback) {
    var i = 0;
    elemento.textContent = '';
    elemento.classList.remove('completado');
    
    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        } else {
            elemento.classList.add('completado');
            if (callback) callback();
        }
    }
    
    escribir();
}

function apagarVela() {
    var flame = document.getElementById('flame-wish');
    var button = document.getElementById('wishButton');
    var message = document.getElementById('wishMessage');
    var transicion = document.getElementById('transicion-oscura');
    var textoElemento = document.getElementById('texto-mecanografiado');
    var emojiElemento = document.querySelector('.mensaje-final .emoji');
    
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
            transicion.classList.add('active');
            
            setTimeout(function() {
                emojiElemento.style.opacity = '1';
            }, 500);
            
            setTimeout(function() {
                escribirMensaje(textoElemento, '¡Espero que tu deseo se haga realidad, muchas felicidades! :3', 140, function() {
                    setTimeout(function() {
                        transicion.classList.remove('active');
                        transicion.classList.add('mantener-negro');
                        
                        if (music) {
                            music.pause();
                            music.currentTime = 0;
                            localStorage.setItem('musicPlaying', 'false');
                            localStorage.setItem('musicTime', '0');
                        }
                        
                        setTimeout(function() {
                            localStorage.removeItem('musicPlaying');
                            localStorage.removeItem('musicTime');
                            window.location.href = "index.html";
                        }, 1500);
                        
                    }, 1000);
                });
            }, 800);
            
        }, 800);
        
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
    crearGlobosVerticales();
    
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