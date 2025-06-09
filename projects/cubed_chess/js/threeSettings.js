import {OrbitControls} from "three/addons/controls/OrbitControls";
import * as THREE from "three";

export const scene = new THREE.Scene();
scene.background = new THREE.Color("#171616");

//scene.background = new THREE.Color("#171616"); // Dark gray, for example
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

function threeJsSetup() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.backgr
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 0);
    camera.position.z = 5;
    controls.update();
    controls.mouseButtons = {
        RIGHT: THREE.MOUSE.ROTATE
    }
    controls.enablePan = false;
    controls.maxDistance = 25;
    return controls;
}


const controls = threeJsSetup();


export function animateLoop() {
    requestAnimationFrame(animateLoop);
    controls.update();
    renderer.render(scene, camera);
}


const mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

export function retrieveTileOnClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObject(scene)

    return intersects[0]
}