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

var music = document.getElementById('bg-music');

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