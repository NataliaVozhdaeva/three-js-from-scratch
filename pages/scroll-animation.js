import * as THREE from 'three';
import getLayer from '../src/getLayer.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import getStarfield from '../src/stars.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(w, h);
let scrollPositionY = 0;

function initScene({ geo }) {
  const geometry = geo;
  geometry.center();

  const textureLoader = new THREE.TextureLoader();
  const mat = new THREE.MeshMatcapMaterial({
    matcap: textureLoader.load('../src/imgs/blue.jpg'),
  });

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(2, 3, 4);
  scene.add(light);

  const astronaut = new THREE.Mesh(geometry, mat);
  scene.add(astronaut);
  astronaut.position.set(1.5, -0.5, 0);

  const gradientBackground = getLayer({
    hue: 0.6,
    numSprites: 8,
    opacity: 0.2,
    radius: 10,
    size: 24,
    z: -10.5,
  });
  scene.add(gradientBackground);

  const stars = getStarfield({ numStars: 1000 });
  scene.add(stars);

  let goalPos = 0;

  function animate() {
    requestAnimationFrame(animate);

    goalPos = Math.PI * -scrollPositionY;
    astronaut.rotation.y -= (astronaut.rotation.y - goalPos * 1) * 0.1;
    stars.position.z -= (stars.position.z - goalPos * 7) * 0.1;
    renderer.render(scene, camera);
  }

  animate();
}

const manager = new THREE.LoadingManager();
const loader = new OBJLoader(manager);
const sceneData = {};

manager.onLoad = () => initScene(sceneData);
loader.load('../src/astronaut.obj', (obj) => {
  let geometry;
  obj.traverse((child) => {
    if (child.type === 'Mesh') {
      geometry = child.geometry;
    }
  });

  sceneData.geo = geometry;
});

window.addEventListener('scroll', () => {
  scrollPositionY = window.scrollY / document.body.clientHeight;
});
