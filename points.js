// Create points
const container = document.getElementById('points-container');
const numPoints = 1000;
const points = []; // Store points array reference

// Create points once and store reference
for (let i = 0; i < numPoints; i++) {
    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${Math.random() * 100}%`;
    point.style.top = `${Math.random() * 100}%`;
    container.appendChild(point);
    points.push(point); // Store reference
}

// Use requestAnimationFrame and throttle mousemove
let mouseX = 0;
let mouseY = 0;
let animationFrameId = null;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePoints);
    }
});

function updatePoints() {
    points.forEach(point => {
        const rect = point.getBoundingClientRect();
        const distance = Math.hypot(
            mouseX - (rect.left + rect.width/2),
            mouseY - (rect.top + rect.height/2)
        );
        
        if (distance <= 100) {
            const hue = 240 + (distance / 100) * 40;
            point.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        } else {
            point.style.backgroundColor = 'transparent';
        }
    });
    
    animationFrameId = null;
} 