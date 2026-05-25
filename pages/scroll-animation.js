import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 100);
camera.position.z = 5;
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(w, h);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDampling = true;

const geo = new THREE.BoxGeometry();
const mat = new THREE.MeshPhongMaterial({
  color: 0x00ff80,
  shininess: 100,
});

const light = new THREE.HemisphereLight(0xff3030, 0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

const obj = new THREE.Mesh(geo, mat);
scene.add(obj);

function animate() {
  requestAnimationFrame(animate);
  obj.rotation.x += 0.02;
  obj.rotation.z += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

animate();
