function crearGlobosVerticales() {
    var container = document.getElementById('globos-container');
    if (!container) return;
    
    var colores = ['#ff6b6b', '#ffd93d', '#4d96ff', '#6bcb77', '#ff6bff', '#ff9f43', '#00d2d3', '#ff4757', '#a29bfe', '#fd79a8'];
    var cantidad = 25;
    
    for (var i = 0; i < cantidad; i++) {
        var globo = document.createElement('div');
        globo.className = 'globos-vertical';
        
        var color = colores[Math.floor(Math.random() * colores.length)];
        var size = 30 + Math.random() * 35;
        
        var globoBody = document.createElement('div');
        globoBody.style.cssText = 
            'width: ' + size + 'px;' +
            'height: ' + (size * 1.1) + 'px;' +
            'background: radial-gradient(ellipse at 40% 30%, ' + color + ', ' + color + 'dd);' +
            'border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;' +
            'box-shadow: inset -5px -5px 15px rgba(0,0,0,0.1), 0 5px 25px ' + color + '55;' +
            'position: relative;' +
            'margin: 0 auto;';
        
        var cuerda = document.createElement('div');
        cuerda.style.cssText = 
            'width: 2px;' +
            'height: ' + (15 + Math.random() * 15) + 'px;' +
            'background: #8a7a6a;' +
            'margin: 0 auto;' +
            'border-radius: 2px;';
        
        var nudo = document.createElement('div');
        nudo.style.cssText = 
            'width: 6px;' +
            'height: 4px;' +
            'background: ' + color + ';' +
            'border-radius: 50%;' +
            'margin: 0 auto;' +
            'margin-bottom: 2px;';
        
        var brillo = document.createElement('div');
        brillo.style.cssText = 
            'position: absolute;' +
            'top: ' + (size * 0.15) + 'px;' +
            'left: ' + (size * 0.15) + 'px;' +
            'width: ' + (size * 0.15) + 'px;' +
            'height: ' + (size * 0.15) + 'px;' +
            'background: rgba(255,255,255,0.2);' +
            'border-radius: 50%;' +
            'transform: rotate(-30deg);';
        
        globoBody.appendChild(brillo);
        globo.appendChild(globoBody);
        globo.appendChild(nudo);
        globo.appendChild(cuerda);
        
        var posX = Math.random() * 95 + 2;
        globo.style.setProperty('--pos-x', posX + '%');
        
        var delay = Math.random() * 12;
        globo.style.setProperty('--delay', delay + 's');
        
        var duration = 12 + Math.random() * 12;
        globo.style.animationDuration = duration + 's';
        
        globo.style.transform = 'scale(' + (0.6 + Math.random() * 0.6) + ')';
        
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