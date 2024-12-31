export function initRocketLaunch(containerId) {
    const container = document.getElementById(containerId);
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 400;
    canvas.style.backgroundColor = '#E6F3FF'; // Light blue background
    canvas.style.display = 'block';
    canvas.style.margin = 'auto';
    canvas.style.borderRadius = '10px'; // Rounded corners
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let rockets = [];
    let lastLaunchTime = 0;
    let rocketRate = 0;

    function drawLaunchpad() {
        ctx.fillStyle = '#808080';
        ctx.fillRect(100, 350, 100, 50);
    }

    function drawRocket(x, y) {
        // Rocket body
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 10, y + 10);
        ctx.lineTo(x - 10, y + 40);
        ctx.lineTo(x + 10, y + 40);
        ctx.lineTo(x + 10, y + 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rocket nose cone
        ctx.beginPath();
        ctx.moveTo(x - 10, y + 10);
        ctx.lineTo(x, y);
        ctx.lineTo(x + 10, y + 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rocket fins
        ctx.beginPath();
        ctx.moveTo(x - 10, y + 30);
        ctx.lineTo(x - 15, y + 40);
        ctx.lineTo(x - 10, y + 40);
        ctx.moveTo(x + 10, y + 30);
        ctx.lineTo(x + 15, y + 40);
        ctx.lineTo(x + 10, y + 40);
        ctx.stroke();

        // Fire
        drawFire(x, y + 40);
    }

    function drawFire(x, y) {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(x, y, x, y + 30);
        gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 128, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        
        ctx.moveTo(x - 8, y);
        ctx.quadraticCurveTo(x - 15, y + 15, x - 5, y + 30);
        ctx.lineTo(x + 5, y + 30);
        ctx.quadraticCurveTo(x + 15, y + 15, x + 8, y);
        ctx.closePath();
        ctx.fill();
    }

    function updateRockets() {
        rockets = rockets.filter(rocket => rocket.y > -50);
        rockets.forEach(rocket => {
            rocket.y -= 2;
        });
    }

    function launchRocket() {
        rockets.push({ x: 150, y: 350 });
    }

    function triggerSingleLaunch() {
        launchRocket();
    }

    function animate(currentTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawLaunchpad();

        updateRockets();
        rockets.forEach(rocket => drawRocket(rocket.x, rocket.y));

        const launchInterval = 1000 / rocketRate;

        if (currentTime - lastLaunchTime > launchInterval) {
            launchRocket();
            lastLaunchTime = currentTime;
        }

        requestAnimationFrame(animate);
    }

    animate(0);

    return {
        setRocketRate: (rate) => {
            rocketRate = rate;
        },
        triggerSingleLaunch: triggerSingleLaunch
    };
}