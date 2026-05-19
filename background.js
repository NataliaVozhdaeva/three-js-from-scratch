import * as THREE from 'three';

function createSprite(madeFrom, x, y, z, size) {
  const sprite = new THREE.Sprite(madeFrom);
  sprite.scale.set(size, size, size);
  sprite.position.set(x, y, z);

  return sprite;
}

export default function getBack() {
  const loader = new THREE.TextureLoader();
  const texture = loader.load('./src/circle.png');

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });

  const spritesGroup = new THREE.Group();

  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 2;
    const depth = 3;
    const x = Math.cos(angle) * Math.random() * radius;
    const y = Math.sin(angle) * Math.random() * radius;
    const z = (i / 20) * depth - depth / 2;

    const sprite = createSprite(material, x, y, z, 1);
    spritesGroup.add(sprite);
  }

  return spritesGroup;
}
