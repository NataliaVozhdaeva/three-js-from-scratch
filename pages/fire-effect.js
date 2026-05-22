import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const textureLoader = new THREE.TextureLoader();
const diffuse = textureLoader.load('../src/textures/oak.jpg');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.append(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDampling = true;

const geo = new THREE.SphereGeometry();
const thingMat = new THREE.MeshStandardMaterial({
  map: diffuse,
  // color: 0xffffff,
});
const thing = new THREE.Mesh(geo, thingMat);
scene.add(thing);

const commonLight = new THREE.HemisphereLight(0xccffff, 0x666600);
scene.add(commonLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // controls.update();
}

animate();
