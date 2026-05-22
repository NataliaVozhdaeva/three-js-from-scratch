import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getParticleSystem } from '../src/getParticleSystem.js';

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDampling = true;

const geo = new THREE.SphereGeometry();
const thingMat = new THREE.MeshStandardMaterial({
  map: diffuse,
});
const ball = new THREE.Mesh(geo, thingMat);
ball.position.set(0, -0.75, 0);
scene.add(ball);

const smoke = getParticleSystem({
  camera,
  emitter: ball,
  parent: scene,
  rate: 25,
  texture: '../src/imgs/fire.png',
});

const commonLight = new THREE.HemisphereLight(0xccffff, 0x666600);
scene.add(commonLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  smoke.update(0.016);
  ball.rotation.x += 0.01;
  ball.rotation.y += 0.02;
  controls.update();
}

animate();
