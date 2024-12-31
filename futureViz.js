export function initFutureViz(containerId) {
    const container = document.getElementById(containerId);
    let canvas, ctx, particles = [];
    
    // Initialize canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        // Create initial "seed" particle at center
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: 0,
            vy: 0,
            generation: 0,
            children: 0,
            lastSpawn: Date.now(),
            spawnDelay: 2000,
            size: 4
        });
    }

    // Create new branches
    function spawn(parent) {
        const now = Date.now();
        if (now - parent.lastSpawn < parent.spawnDelay) return;
        if (parent.children >= 3) return;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 0.5;
        
        particles.push({
            x: parent.x,
            y: parent.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            generation: parent.generation + 1,
            children: 0,
            lastSpawn: now,
            spawnDelay: parent.spawnDelay * 1.1,
            size: parent.size * 0.9
        });
        
        parent.children++;
        parent.lastSpawn = now;
    }

    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            // Draw particle
            const brightness = Math.max(0, 255 - (p.generation * 20));
            ctx.fillStyle = `rgb(${brightness}, ${brightness * 0.7}, ${brightness * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Spawn new branches
            if (p.generation < 8) {
                spawn(p);
            }
            
            // Remove particles that go off screen
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                particles = particles.filter(part => part !== p);
            }
        });
        
        requestAnimationFrame(animate);
    }

    // Public methods
    return {
        start() {
            init();
            animate();
        },
        stop() {
            if (canvas) {
                canvas.remove();
            }
            particles = [];
        }
    };
}