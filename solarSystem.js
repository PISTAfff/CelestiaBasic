const planetConfigs = [
  {
    rotSpeed: 0.1,
    texture: "sunTexture.jpg",
    size: 2.5,
    posX: -5,
  },
  {
    rotSpeed: 0.02,
    texture: "mercuryTexture.jpg",
    size: 0.05,
    posX: -1.5,
  },
  {
    rotSpeed: 0.01,
    texture: "venusTexture.jpg",
    size: 0.1,
    posX: -1,
  },
  {
    rotSpeed: 1,
    texture: "earthTexture.jpg",
    size: 0.125,
    posX: -0.5,
  },
  {
    rotSpeed: 0.04,
    texture: "moonTexture.jpg",
    size: 0.05,
    posX: -0.2,
  },
  {
    rotSpeed: 0.98,
    texture: "marsTexture.jpg",
    size: 0.115,
    posX: 0.25,
  },
  {
    rotSpeed: 2.4,
    texture: "jupiterTexture.jpg",
    size: 0.4,
    posX: 1,
  },
  {
    rotSpeed: 2.2,
    texture: "saturnTexture.jpg",
    size: 0.3,
    posX: 2.15,
  },
  {
    rotSpeed: 1.4,
    texture: "uranusTexture.jpg",
    size: 0.2,
    posX: 3,
  },
  {
    rotSpeed: 1.5,
    texture: "neptuneTexture.jpg",
    size: 0.2,
    posX: 3.75,
  },
];
const container = document.getElementById("solarSystemContainer");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const planets = [];

planetConfigs.forEach(({ texture, size, posX, rotSpeed }) => {
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(texture);

  const geometry = new THREE.SphereGeometry(size, 128, 128);
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
    roughness: 1,
    metalness: 0.2,
  });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = posX;
  scene.add(planet);
  let ring = null;
  if (texture === "saturnTexture.jpg") {
    const ringTexture = textureLoader.load("rings.png");
    const ringGeometry = new THREE.RingGeometry(size / 2, size + 0.3, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);
    ring.rotation.y = 45;
    ring.rotation.x = 90;
    ring.position.x = posX;
    planets.push([ring, rotSpeed, true]);
  }
  planets.push([planet, rotSpeed, false]);

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
function animate() {
  requestAnimationFrame(animate);
  planets.forEach(([planet, rotSpeed, ring]) => {
    if (ring) {
      planet.rotation.z += 0.001 * rotSpeed;
    } else {
      planet.rotation.y += 0.001 * rotSpeed;
    }
  });
  renderer.render(scene, camera);
}

animate();
