function crearGlobosVerticales() {
    var container = document.getElementById('globos-container');
    if (!container) return;
    
    var colores = [
        '#FF1744', '#FF9100', '#FFEA00', '#00E676', '#00BCD4',
        '#2979FF', '#D500F9', '#FF4081', '#FF6D00', '#76FF03',
        '#18FFFF', '#E040FB', '#FFAB00', '#00E5FF', '#F50057',
        '#FF5252', '#FFD740', '#69F0AE', '#40C4FF', '#B388FF',
        '#FF80AB', '#FFAB91', '#B2FF59', '#84FFFF', '#EA80FC'
    ];
    
    var cantidad = 50;
    var mitad = Math.floor(cantidad / 2);
    var posiciones = [];
    
    for (var i = 0; i < mitad; i++) {
        posiciones.push(1 + Math.random() * 24);
    }
    
    for (var i = 0; i < cantidad - mitad; i++) {
        posiciones.push(75 + Math.random() * 24);
    }
    
    for (var i = posiciones.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = posiciones[i];
        posiciones[i] = posiciones[j];
        posiciones[j] = temp;
    }
    
    for (var i = 0; i < cantidad; i++) {
        var globo = document.createElement('div');
        globo.className = 'globos-vertical';
        
        var color = colores[Math.floor(Math.random() * colores.length)];
        var size = 20 + Math.random() * 45;
        
        globo.innerHTML = 
            '<div style="' +
            'width: ' + size + 'px;' +
            'height: ' + (size * 1.1) + 'px;' +
            'background: radial-gradient(ellipse at 40% 30%, ' + color + ', ' + color + 'cc);' +
            'border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;' +
            'box-shadow: inset -5px -5px 15px rgba(0,0,0,0.08), 0 5px 25px ' + color + '44;' +
            'position: relative;' +
            'margin: 0 auto;' +
            'border: 1px solid rgba(255,255,255,0.05);' +
            '">' +
            '<div style="' +
            'position: absolute;' +
            'top: ' + (size * 0.12) + 'px;' +
            'left: ' + (size * 0.12) + 'px;' +
            'width: ' + (size * 0.2) + 'px;' +
            'height: ' + (size * 0.2) + 'px;' +
            'background: radial-gradient(circle, rgba(255,255,255,0.35), transparent);' +
            'border-radius: 50%;' +
            'transform: rotate(-30deg);' +
            '"></div>' +
            '<div style="' +
            'position: absolute;' +
            'bottom: ' + (size * 0.15) + 'px;' +
            'right: ' + (size * 0.12) + 'px;' +
            'width: ' + (size * 0.08) + 'px;' +
            'height: ' + (size * 0.08) + 'px;' +
            'background: rgba(255,255,255,0.15);' +
            'border-radius: 50%;' +
            '"></div>' +
            '</div>' +
            '<div style="' +
            'width: 6px;' +
            'height: 4px;' +
            'background: ' + color + ';' +
            'border-radius: 50%;' +
            'margin: 0 auto;' +
            'margin-bottom: 2px;' +
            '"></div>' +
            '<div style="' +
            'width: 1.5px;' +
            'height: ' + (10 + Math.random() * 18) + 'px;' +
            'background: rgba(180, 170, 160, 0.3);' +
            'margin: 0 auto;' +
            'border-radius: 2px;' +
            '"></div>';
        
        var posX = posiciones[i];
        globo.style.setProperty('--pos-x', posX + '%');
        
        var delay = Math.random() * 18;
        globo.style.setProperty('--delay', delay + 's');
        
        var duration = 10 + Math.random() * 18;
        globo.style.animationDuration = duration + 's';
        
        var scale = 0.4 + Math.random() * 0.9;
        globo.style.transform = 'scale(' + scale + ')';
        
        container.appendChild(globo);
    }
}

function crearEstrellas() {
    var container = document.getElementById('estrellas-container');
    if (!container) return;
    
    var simbolos = ['✦', '✧', '✦', '✧', '✦', '✧', '✦', '✧'];
    var cantidad = 25;
    
    for (var i = 0; i < cantidad; i++) {
        var estrella = document.createElement('div');
        estrella.className = 'estrella-destello';
        estrella.textContent = simbolos[i % simbolos.length];
        container.appendChild(estrella);
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
    var mensajeFinal = document.getElementById('mensaje-final');
    var estrellasContainer = document.getElementById('estrellas-container');
    
    if (!flame || button.disabled) return;
    
    button.disabled = true;
    button.style.transition = 'opacity 0.4s ease';
    button.style.opacity = '0';
    
    flame.classList.add('apagada');
    
    setTimeout(function() {
        flame.style.display = 'none';
        button.style.display = 'none';
        message.style.display = 'block';
        
        setTimeout(function() {
            transicion.classList.add('active');
            
            setTimeout(function() {
                emojiElemento.style.opacity = '1';
            }, 500);
            
            setTimeout(function() {
                escribirMensaje(textoElemento, '¡Espero que tu deseo se haga realidad, muchas felicidades!', 115, function() {
                    setTimeout(function() {
                        mensajeFinal.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        mensajeFinal.style.transform = 'scale(0)';
                        mensajeFinal.style.opacity = '0';
                        
                        emojiElemento.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        emojiElemento.style.transform = 'scale(0)';
                        emojiElemento.style.opacity = '0';
                        
                        if (estrellasContainer) {
                            estrellasContainer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            estrellasContainer.style.opacity = '0';
                            estrellasContainer.style.transform = 'scale(0.8)';
                        }
                        
                        if (music) {
                            music.pause();
                            music.currentTime = 0;
                            localStorage.setItem('musicPlaying', 'false');
                            localStorage.setItem('musicTime', '0');
                        }
                        
                        setTimeout(function() {
                            transicion.classList.remove('active');
                            transicion.classList.add('mantener-negro');
                            
                            setTimeout(function() {
                                localStorage.removeItem('musicPlaying');
                                localStorage.removeItem('musicTime');
                                window.location.href = "index.html";
                            }, 1000);
                            
                        }, 1000);
                        
                    }, 4000);
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
    crearEstrellas();
    
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