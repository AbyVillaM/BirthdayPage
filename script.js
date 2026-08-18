var segundos = 55;
var minutos = 59;
var horas = 23;
var dia = 3;
var relojTerminado = false;

function actualizarReloj() {
    if (relojTerminado) return;
    
    segundos++;
    
    if (segundos === 60) {
        segundos = 0;
        minutos++;
        document.getElementById('reloj-segundos').textContent = '00';
        document.getElementById('reloj-minutos').textContent = String(minutos).padStart(2, '0');
    } else {
        document.getElementById('reloj-segundos').textContent = String(segundos).padStart(2, '0');
    }
    
    if (minutos === 60) {
        minutos = 0;
        horas++;
        document.getElementById('reloj-minutos').textContent = '00';
        document.getElementById('reloj-horas').textContent = String(horas).padStart(2, '0');
    }
    
    // Cuando cambia a 00:00:00
if (horas === 24) {
    horas = 0;
    minutos = 0;
    segundos = 0;
    dia = 4;
    
    document.getElementById('reloj-horas').textContent = '00';
    document.getElementById('reloj-minutos').textContent = '00';
    document.getElementById('reloj-segundos').textContent = '00';
    document.getElementById('reloj-dia').textContent = '04';
    
    // Efecto de brillo
    document.getElementById('reloj-dia').classList.add('cambiando');
    document.querySelector('.reloj-hora').classList.add('brillante');
    
    relojTerminado = true;
    setTimeout(function() {
        terminarReloj();
    }, 2000);
    
    return;
}
}
function terminarReloj() {
    var relojScreen = document.getElementById('reloj-screen');
    var giftWrapper = document.getElementById('gift-wrapper');
    
    relojScreen.style.opacity = '0';
    
    setTimeout(function() {
        relojScreen.style.display = 'none';
        
        giftWrapper.style.opacity = '1';
        giftWrapper.style.transform = 'scale(1)';
        giftWrapper.style.animation = 'giftAppear 1.5s cubic-bezier(0.17, 0.67, 0.35, 1.35) forwards';
        giftWrapper.style.cursor = 'pointer';
        
        iniciarMusica();
        
        startConfetti();
        
        crearCelebracion();
        
    }, 500);
}

function crearCelebracion() {
    var emojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎆', '🎇', '🥳'];
    
    for (var i = 0; i < 30; i++) {
        var particula = document.createElement('div');
        particula.style.cssText = 'position:fixed;pointer-events:none;z-index:1001;font-size:' + (20 + Math.random() * 30) + 'px;';
        particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        var x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
        var y = window.innerHeight / 2 + (Math.random() - 0.5) * 100;
        var tx = (Math.random() - 0.5) * 600;
        var ty = -200 - Math.random() * 400;
        
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.setProperty('--tx', tx + 'px');
        particula.style.setProperty('--ty', ty + 'px');
        particula.style.animation = 'particulaVuela 1.5s ease-out forwards';
        
        document.body.appendChild(particula);
        
        setTimeout(function() {
            particula.remove();
        }, 1800);
    }
}

var music = document.getElementById('bg-music');

function iniciarMusica() {
    if (music) {
        music.play().then(function() {
            console.log('🎵 Música iniciada');
            localStorage.setItem('musicPlaying', 'true');
        }).catch(function() {
            console.log('⏳ Esperando interacción...');
        });
    }
}

document.addEventListener('click', function() {
    if (music && music.paused) {
        music.play().catch(function() {});
        try {
            localStorage.setItem('musicPlaying', 'true');
        } catch(e) {}
    }
});

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
function startConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var particles = [];
    var colors = ['#ff3cac', '#ffd43b', '#61dcff', '#ff6b6b', '#51cf66', '#ff922b', '#a66cff', '#ff6b9d'];
    
    for (var i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 12 + 4,
            h: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 6 - 3,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.05 + 0.02
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.y += p.speed;
            p.rotation += p.rotationSpeed;
            p.wobble += p.wobbleSpeed;
            p.x += Math.sin(p.wobble) * 0.5;
            
            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
                p.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            ctx.restore();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function openGift() {
    var wrapper = document.getElementById("gift-wrapper");
    var card = document.getElementById("greeting-card");

    if (!wrapper || !card) return;

    wrapper.classList.add("opened");
    startConfetti();

    setTimeout(function () {
        card.classList.add("show");
    }, 900);
}

function openLetter() {
    try {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
            localStorage.setItem('musicPlaying', 'true');
        }
    } catch(e) {}
    window.location.href = "carta.html";
}

window.addEventListener('resize', function() {
    var canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

window.addEventListener('load', function() {
    // Ocultar el regalo inicialmente
    var giftWrapper = document.getElementById('gift-wrapper');
    if (giftWrapper) {
        giftWrapper.style.opacity = '0';
        giftWrapper.style.transform = 'scale(0.3)';
        giftWrapper.style.animation = 'none';
        giftWrapper.style.cursor = 'default';
    }
    
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
});