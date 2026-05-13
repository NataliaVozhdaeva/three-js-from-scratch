import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);
document.body.append(renderer.domElement);

const fov = 75; //in degrees
const aspect = w / h; //might change as you wish
const near = 0.1; //nearest clipping plan, coordinay=te
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; // point of view. In this case a little bit far from object

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//these were a core of our graphic

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xb57edc);
scene.add(hemilight);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

function animate(t = 0) {
  requestAnimationFrame(animate);
  // mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
