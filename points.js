// Create points
const container = document.getElementById('points-container');
const numPoints = 2500;
const points = []; // Store points array reference

// Add these variables at the top with other declarations
const RADIUS = 150; // Detection radius
const CELL_SIZE = RADIUS * 2; // Size of grid cells for spatial partitioning
const grid = new Map(); // Spatial partition grid

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
    // Update grid with current point positions
    grid.clear();
    points.forEach(point => {
        const rect = point.getBoundingClientRect();
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;
        
        // Calculate grid cell coordinates
        const cellX = Math.floor(centerX / CELL_SIZE);
        const cellY = Math.floor(centerY / CELL_SIZE);
        const key = `${cellX},${cellY}`;
        
        if (!grid.has(key)) {
            grid.set(key, []);
        }
        grid.get(key).push({ point, centerX, centerY });
        
        // Reset point color
        point.style.backgroundColor = 'transparent';
    });
    
    // Only check points in nearby cells
    const mouseCellX = Math.floor(mouseX / CELL_SIZE);
    const mouseCellY = Math.floor(mouseY / CELL_SIZE);
    
    // Check surrounding cells
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const key = `${mouseCellX + dx},${mouseCellY + dy}`;
            const cellPoints = grid.get(key);
            
            if (cellPoints) {
                cellPoints.forEach(({point, centerX, centerY}) => {
                    const distance = Math.hypot(
                        mouseX - centerX,
                        mouseY - centerY
                    );
                    
                    if (distance <= RADIUS) {
                        const hue = 240 + (distance / 100) * 40;
                        point.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
                    }
                });
            }
        }
    }
    
    animationFrameId = null;
} 