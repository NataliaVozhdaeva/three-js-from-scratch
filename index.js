import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarfield from './src/stars.js';
import { drawThreeGeo } from './src/threeGeoJSON.js';

const w = window.innerWidth;
const h = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.2);
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

fetch('./geojson/countries.json')
  .then((response) => response.text())
  .then((text) => {
    const data = JSON.parse(text);
    const countries = drawThreeGeo({
      json: data,
      radius: 2,
      materialOptions: {
        color: 0x80ff80,
      },
    });
    scene.add(countries);
  });

function animate() {
  requestAnimationFrame(animate);
  // geo.rotation.x += 0.01;
  // geo.rotation.y += 0.02;
  renderer.render(scene, camera);
  controls.update();
}

animate();
