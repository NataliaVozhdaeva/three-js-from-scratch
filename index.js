//earth
import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './additional/stars.js';
import getFresnelMat from './additional/fresnel.js';

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

const lightsMat = new THREE.ShaderMaterial({
  uniforms: {
    map: { value: textureLoader.load('textures/earthlights.jpg') },
    sunDirection: { value: new THREE.Vector3(-2, 0.5, 1.5).normalize() },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 sunDirection;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      float t = smoothstep(-0.1, 0.3, dot(vNormal, -sunDirection));
      vec4 col = texture2D(map, vUv);
      gl_FragColor = vec4(col.rgb, t);
    }
  `,
  blending: THREE.AdditiveBlending,
  transparent: true,
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

const fresnelMat = getFresnelMat();
const atmosphere = new THREE.Mesh(geometry, fresnelMat);
atmosphere.scale.setScalar(1.01);
earthGroup.add(atmosphere);

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
  earthMesh.rotation.y += 0.002;
  lightMesh.rotation.y += 0.002;
  atmosphere.rotation.y += 0.002;
  claudMesh.rotation.y += 0.004;

  renderer.render(scene, camera);
}

animate();
