export function initMatterStreaming(containerId) {
    const container = document.getElementById(containerId);
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const earthRadius = 15;
    const moonRadius = 5;
    const moonOrbitRadius = 100;
    const l5Angle = Math.PI / 3; // 60 degrees ahead of the Moon

    let moonAngle = 0;
    const particles = [];
    let particleRate = 0;

    function drawEarth() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0077be';
        ctx.fill();
    }

    function getMoonPosition() {
        return {
            x: centerX + moonOrbitRadius * Math.cos(moonAngle),
            y: centerY + moonOrbitRadius * Math.sin(moonAngle)
        };
    }

    function drawMoon() {
        const moonPos = getMoonPosition();
        ctx.beginPath();
        ctx.arc(moonPos.x, moonPos.y, moonRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#c0c0c0';
        ctx.fill();
    }

    function getL5Position() {
        return {
            x: centerX + moonOrbitRadius * Math.cos(moonAngle + l5Angle),
            y: centerY + moonOrbitRadius * Math.sin(moonAngle + l5Angle)
        };
    }

    function drawL5Point() {
        const l5Pos = getL5Position();
        ctx.beginPath();
        ctx.arc(l5Pos.x, l5Pos.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    }

    function createParticle() {
        return {
            angle: moonAngle,
            progress: 0,
            speed: 0.01 + Math.random() * 0.01,
            radius: Math.random() * 1 + 0.5
        };
    }

    function updateParticles() {
        const scaledRate = particleRate * 0.005; // Reduce the effect of the rate multiplier
        
        for (let i = 0; i < Math.ceil(scaledRate); i++) {
            if (Math.random() < scaledRate) {
                particles.push(createParticle());
            }
        }
    
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.progress += p.speed;
    
            if (p.progress >= 1) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        ctx.fillStyle = '#ffff00';
        particles.forEach(p => {
            const angle = p.angle + p.progress * l5Angle;
            const x = centerX + moonOrbitRadius * Math.cos(angle);
            const y = centerY + moonOrbitRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawEarth();
        drawMoon();
        drawL5Point();
        updateParticles();
        drawParticles();

        moonAngle += 0.002;
        requestAnimationFrame(animate);
    }

    animate();

    return {
        setParticleRate: (rate) => {
            particleRate = rate;
        }
    };
}