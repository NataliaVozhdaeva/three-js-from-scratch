//earth
import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.IcosahedronGeometry(1, 12);
const texture = new THREE.TextureLoader();
const material = new THREE.MeshStandardMaterial({
  map: texture.load('textures/earthcolor.jpg'),
});
const earthMesh = new THREE.Mesh(geometry, material);

scene.add(earthMesh);

const hemiLight = new THREE.HemisphereLight(0xf4e99b, 0xf2e2c1);
scene.add(hemiLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

// const light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(5, 5, 5);
// scene.add(light);

function animate(t = 0) {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.001;
  // earthMesh.rotation.x += 0.002;

  renderer.render(scene, camera);
}

animate();
