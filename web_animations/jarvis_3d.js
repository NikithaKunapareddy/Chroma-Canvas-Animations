// JARVIS 3D Robot Head - Beautiful & Creative Version

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Head (Sphere) with glassy reflection
const headGeometry = new THREE.SphereGeometry(3, 64, 64);
const headMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00e6ff,
    roughness: 0.2,
    metalness: 0.7,
    transmission: 0.7,
    thickness: 0.7,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 1.4,
    reflectivity: 0.7,
    emissive: 0x003366,
    opacity: 0.95,
    transparent: true
});
const head = new THREE.Mesh(headGeometry, headMaterial);
scene.add(head);

// Dynamic glowing core (small sphere inside head)
const coreGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const core = new THREE.Mesh(coreGeometry, coreMaterial);
core.position.set(0, 0, 1.5);
scene.add(core);

// Eyes (gradient, pulsing)
function createEye(x) {
    const eyeGeometry = new THREE.SphereGeometry(0.32, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x00ffff,
        shininess: 100,
        specular: 0x00e6ff
    });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(x, 0.7, 2.6);
    return eye;
}
const leftEye = createEye(-0.9);
const rightEye = createEye(0.9);
scene.add(leftEye);
scene.add(rightEye);

// Animated glowing mouth (cylinder as a line)
const mouthGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 32);
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, emissive: 0x00ffff });
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(0, -0.7, 2.5);
mouth.rotation.z = Math.PI / 2;
scene.add(mouth);

// Forehead arc (Torus)
const foreheadArcGeometry = new THREE.TorusGeometry(1.1, 0.06, 16, 100, Math.PI);
const foreheadArcMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const foreheadArc = new THREE.Mesh(foreheadArcGeometry, foreheadArcMaterial);
foreheadArc.position.set(0, 1.7, 2.3);
foreheadArc.rotation.x = Math.PI / 2.1;
scene.add(foreheadArc);

// Ears (side spheres)
const earGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const earMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x003366, shininess: 80 });
const leftEar = new THREE.Mesh(earGeometry, earMaterial);
const rightEar = new THREE.Mesh(earGeometry, earMaterial);
leftEar.position.set(-2.7, 0.5, 0.5);
rightEar.position.set(2.7, 0.5, 0.5);
scene.add(leftEar);
scene.add(rightEar);

// Antennae (cylinders)
function createAntenna(x) {
    const antennaGeom = new THREE.CylinderGeometry(0.05, 0.09, 1.5, 12);
    const antennaMat = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 100 });
    const antenna = new THREE.Mesh(antennaGeom, antennaMat);
    antenna.position.set(x, 2.7, 0.5);
    antenna.rotation.x = -Math.PI / 8;
    return antenna;
}
const leftAntenna = createAntenna(-1.2);
const rightAntenna = createAntenna(1.2);
scene.add(leftAntenna);
scene.add(rightAntenna);

// Glowing circuit lines (animated)
const circuitLines = [];
for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 * i) / 6;
    const lineGeom = new THREE.CylinderGeometry(0.02, 0.02, 2.2, 8);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.7, transparent: true });
    const line = new THREE.Mesh(lineGeom, lineMat);
    line.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 2.2);
    line.rotation.z = angle;
    scene.add(line);
    circuitLines.push(line);
}

// Hologram rings (animated)
const holoRings = [];
for (let i = 0; i < 3; i++) {
    const ringGeom = new THREE.TorusGeometry(3.2 + i * 0.3, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.3, transparent: true });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    holoRings.push(ring);
}

// Floating particles
const particleGroup = new THREE.Group();
for (let i = 0; i < 40; i++) {
    const pGeom = new THREE.SphereGeometry(0.06, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.5, transparent: true });
    const p = new THREE.Mesh(pGeom, pMat);
    p.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7
    );
    particleGroup.add(p);
}
scene.add(particleGroup);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
pointLight.position.set(0, 5, 10);
scene.add(pointLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    head.rotation.y += 0.01;
    // Eyes pulse and color shift
    const t = Date.now() * 0.004;
    const pulse = 0.7 + 0.3 * Math.abs(Math.sin(t));
    leftEye.material.emissive.setHSL(0.5 + 0.2 * Math.sin(t), 1, pulse);
    rightEye.material.emissive.setHSL(0.5 + 0.2 * Math.cos(t), 1, pulse);
    // Core glows
    core.material.color.setHSL(0.5 + 0.5 * Math.sin(t), 1, 0.5 + 0.2 * Math.abs(Math.cos(t)));
    // Mouth glows
    mouth.material.color.setHSL(0.5 + 0.5 * Math.sin(t), 1, 0.6 + 0.2 * Math.abs(Math.sin(t)));
    // Forehead arc animates
    foreheadArc.material.color.setHSL(0.5 + 0.5 * Math.cos(t), 1, 0.6 + 0.2 * Math.abs(Math.cos(t)));
    // Circuit lines animate
    circuitLines.forEach((line, i) => {
        line.material.opacity = 0.5 + 0.5 * Math.abs(Math.sin(t + i));
        line.material.color.setHSL(0.5 + 0.2 * Math.sin(t + i), 1, 0.6);
    });
    // Hologram rings animate
    holoRings.forEach((ring, i) => {
        ring.rotation.z += 0.01 + i * 0.005;
        ring.material.opacity = 0.2 + 0.2 * Math.abs(Math.sin(t + i));
    });
    // Floating particles animate
    particleGroup.children.forEach((p, i) => {
        p.position.x += Math.sin(t + i) * 0.01;
        p.position.y += Math.cos(t + i) * 0.01;
        p.position.z += Math.sin(t + i * 2) * 0.01;
    });
    renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
