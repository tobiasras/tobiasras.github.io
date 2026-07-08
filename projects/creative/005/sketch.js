import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const container = document.getElementById('sketch-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.5,
    100
);
camera.position.set(0, 0, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

controls.dampingFactor = 0.05;

controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
};
controls.enablePan = false

function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}
window.addEventListener('resize', resize);
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', resize);
}



const row = 38;
const spacing = 0.5;
const offset = (row - 1) * spacing / 2;

const pos = [];
for (let x = 0; x < row; x++) {
    for (let y = 0; y < row; y++) {
        for (let z = 0; z < row; z++) {

            pos.push(
                x * spacing - offset,
                y * spacing - offset,
                z * spacing - offset
            );
        }
    }
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(pos, 3)
);

const material = new THREE.PointsMaterial({
    size: 0.1
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);



const positions = geometry.attributes.position.array;

function animate() {
    requestAnimationFrame(animate);











    geometry.attributes.position.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
}

animate();
