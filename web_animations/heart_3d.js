
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Heart parametric function
function heartFunction(t, scale = 10) {
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new THREE.Vector3(x, y, 0);
}



// Instagram-style glowing heart: multiple layers, all centered, with jitter and glow
const layers = 6;
const particles = 1200;
const pointsArray = [];
const geometryArray = [];
const basePhase = [];
const jitterArray = [];

// Precompute base phase and jitter for each particle
for (let i = 0; i < particles; i++) {
    basePhase[i] = (Math.PI * 2 * i) / particles;
    jitterArray[i] = (Math.random() - 0.5) * 0.7;
}

for (let l = 0; l < layers; l++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);
    const scale = 15 + l * 0.7;
    const opacity = 0.13 + l * 0.13;
    for (let i = 0; i < particles; i++) {
        const t = basePhase[i];
        const jitter = jitterArray[i] * (l + 1);
        const pos = heartFunction(t, scale + jitter);
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
        // Pink color with some variation
        const color = new THREE.Color(`hsl(330, 100%, ${60 + Math.random() * 20}%)`);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
        size: 6,
        vertexColors: true,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsArray.push(points);
    geometryArray.push(geometry);
}

// Animation loop: particles move smoothly around the heart
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0007;
    for (let l = 0; l < pointsArray.length; l++) {
        const geometry = geometryArray[l];
        const scale = 15 + l * 0.7;
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < particles; i++) {
            // Animate phase for each particle
            const phase = (basePhase[i] + time * (0.7 + l * 0.13)) % (Math.PI * 2);
            const jitter = jitterArray[i] * (l + 1);
            const pos = heartFunction(phase, scale + jitter);
            positions[i * 3] = pos.x;
            positions[i * 3 + 1] = pos.y;
            positions[i * 3 + 2] = pos.z;
        }
        geometry.attributes.position.needsUpdate = true;
        pointsArray[l].scale.setScalar(1);
        pointsArray[l].rotation.z = 0;
        pointsArray[l].rotation.y = 0;
    }
    renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});