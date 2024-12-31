export function initSatellites(containerId) {
    const container = document.getElementById(containerId);
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Constants
    const orbitRadius = 150;
    const satelliteRadius = 3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = canvas.width / 800; // Scale factor for viewBox conversion

    class Satellite {
        constructor() {
            this.inclination = Math.random() * Math.PI;
            this.ascendingNode = Math.random() * Math.PI * 2;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.2 + Math.random() * 0.8;
        }

        update() {
            this.angle += 0.01 * this.speed;
            if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;

            const x = orbitRadius * Math.cos(this.angle);
            const y = orbitRadius * Math.sin(this.angle);

            const rotatedX = x * Math.cos(this.ascendingNode) - y * Math.sin(this.ascendingNode) * Math.cos(this.inclination);
            const rotatedY = x * Math.sin(this.ascendingNode) + y * Math.cos(this.ascendingNode) * Math.cos(this.inclination);
            const rotatedZ = y * Math.sin(this.inclination);

            const perspectiveScale = 200 / (200 - rotatedZ);
            const projectedX = rotatedX * perspectiveScale;
            const projectedY = rotatedY * perspectiveScale;

            // Store computed values for rendering
            this.renderX = centerX + projectedX * scale;
            this.renderY = centerY + projectedY * scale;
            this.renderRadius = satelliteRadius * perspectiveScale * scale;
            this.opacity = (rotatedZ + 150) / 300;
        }
    }

    let satellites = [];

    function createSatellites(count) {
        count = Math.floor(count);
        
        // Remove excess satellites if count is lower
        while (satellites.length > count) {
            satellites.pop();
        }

        // Add new satellites if count is higher
        while (satellites.length < count) {
            satellites.push(new Satellite());
        }
    }

    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw sun
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#f55f02';
        ctx.fill();

        // Draw satellites
        satellites.forEach(satellite => {
            ctx.beginPath();
            ctx.arc(satellite.renderX, satellite.renderY, satellite.renderRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${satellite.opacity})`;
            ctx.fill();
        });
    }

    function animate() {
        satellites.forEach(satellite => satellite.update());
        render();
        requestAnimationFrame(animate);
    }

    // Initialize with default count
    createSatellites(1);
    animate();

    // Return methods for external control
    return {
        setSatelliteCount: createSatellites
    };
}