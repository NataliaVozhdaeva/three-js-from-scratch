//earth
import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './additional/stars.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.SphereGeometry(1, 64, 64);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshStandardMaterial({
  map: textureLoader.load('textures/earthcolor.jpg'),
});
const earthMesh = new THREE.Mesh(geometry, material);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('textures/earthlights.jpg'),
  blending: THREE.AdditiveBlending,
});
const lightMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightMesh);

const claudMats = new THREE.MeshStandardMaterial({
  map: textureLoader.load('textures/earthclouds.jpg'),
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
});
const claudMesh = new THREE.Mesh(geometry, claudMats);
claudMesh.scale.setScalar(1.003);
earthGroup.add(claudMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

new OrbitControls(camera, renderer.domElement);

document.body.append(renderer.domElement);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);
  earthGroup.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();
