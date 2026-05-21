import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
// import getLayer from './background.js';
import getStarfield from './stars.js';

const w = window.innerWidth;
const h = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDampling = true;

const geo = new THREE.SphereGeometry(2);
const edges = new THREE.EdgesGeometry(geo, 1);
const mat = new THREE.LineBasicMaterial({
  color: 0xffffff,
  opacity: 0.4,
  transparent: true,
});
const line = new THREE.LineSegments(edges, mat);
scene.add(line);

const stars = getStarfield({ numStars: 1000 });
scene.add(stars);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  // geo.rotation.x += 0.01;
  // geo.rotation.y += 0.02;
  renderer.render(scene, camera);
  controls.update();
}

animate();
