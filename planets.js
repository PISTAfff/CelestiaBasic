document.addEventListener("DOMContentLoaded", () => {
  const planetConfigs = [
    {
      id: "earthContainer3D",
      texture: "earthTexture.jpg",
      size: 0.8,
      cameraZ: 2.5,
      posX: 0,
    },
    {
      id: "sunContainer3D",
      texture: "sunTexture.jpg",
      size: 1.25,
      cameraZ: 4,
      posX: 0,
    },
    {
      id: "moonContainer3D",
      texture: "moonTexture.jpg",
      size: 0.3,
      cameraZ: 1.5,
      posX: 0,
    },
    {
      id: "venusContainer3D",
      texture: "venusTexture.jpg",
      size: 0.7,
      cameraZ: 2.5,
      posX: 0,
    },
    {
      id: "mercuryContainer3D",
      texture: "mercuryTexture.jpg",
      size: 0.3,
      cameraZ: 1.5,
      posX: 0,
    },
    {
      id: "marsContainer3D",
      texture: "marsTexture.jpg",
      size: 0.6,
      cameraZ: 2,
      posX: 0,
    },
    {
      id: "neptuneContainer3D",
      texture: "neptuneTexture.jpg",
      size: 0.8,
      cameraZ: 3,
      posX: 0,
    },
    {
      id: "uranusContainer3D",
      texture: "uranusTexture.jpg",
      size: 0.8,
      cameraZ: 3,
      posX: 0,
    },
    {
      id: "jupiterContainer3D",
      texture: "jupiterTexture.jpg",
      size: 1,
      cameraZ: 4,
      posX: 0,
    },
    {
      id: "saturnContainer3D",
      texture: "saturnTexture.jpg",
      size: 1,
      cameraZ: 4.5,
      posX: 0,
    },
  ];

  planetConfigs.forEach(({ id, texture, size, cameraZ, posX }) => {
    const container = document.getElementById(id);
    if (!container) return;

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
    camera.position.z = cameraZ;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load(texture);

    const geometry = new THREE.SphereGeometry(size, 128, 128);
    const material = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 1,
      metalness: 0.2,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
    let ring = null;
    if (id === "saturnContainer3D") {
      const ringTexture = textureLoader.load("rings.png");
      const ringGeometry = new THREE.RingGeometry(size / 2, size + 1, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
      });
      ring = new THREE.Mesh(ringGeometry, ringMaterial);
      scene.add(ring);
      ring.rotation.y = 25;
      ring.rotation.x = 5;
    }
    let time = 0;
    camera.position.x = posX;
    function animate() {
      requestAnimationFrame(animate);
      if (ring) {
        ring.rotation.z += 0.001;
      }
      planet.rotation.y += 0.001;
      time += 0.01;
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
  });
});
