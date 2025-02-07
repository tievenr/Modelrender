import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ModelRender {
  constructor(canvasId) {
    // Core components for Three.js initialization
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    // Camera params
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    // Additional components
    this.clock = undefined;
    this.controls = undefined;
    // Lighting
    this.ambientLight = undefined;
    this.directionalLight = undefined;
    // Floor
    this.floor = undefined;
    // Raycaster for mesh selection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    // Store selectable meshes
    this.selectableMeshes = [];
    // Currently selected mesh
    this.selectedMesh = null;
  }

  initialize() {
    this.scene = new THREE.Scene();
    // Set sky blue background
    this.scene.background = new THREE.Color(0x87ceeb);
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 48;

    // Specify the canvas
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    // Dynamically set the size based on the canvas container's size
    const parent = canvas.parentElement;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);

    // Initialize clock and controls
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // Add floor (10x larger)
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000); // Increased from 100 to 1000
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e8b57, // Forest green color
      side: THREE.DoubleSide,
    });
    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    this.floor.position.y = -10; // Position below the origin
    this.scene.add(this.floor);

    // Add click event listener for mesh selection
    canvas.addEventListener(
      'click',
      (event) => this.onMouseClick(event),
      false
    );

    // Window resize handling
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  // Add method to handle GLB model loading and make meshes selectable
  addSelectableMesh(mesh) {
    // Add the mesh to the selectable meshes array
    this.selectableMeshes.push(mesh);
    // Add the mesh to the scene
    this.scene.add(mesh);
  }

  onMouseClick(event) {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate mouse position in normalized device coordinates (-1 to +1)
    this.mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.selectableMeshes);

    // Reset previous selection
    if (this.selectedMesh) {
      this.selectedMesh.material.emissive.setHex(0x000000);
    }

    // Handle new selection
    if (intersects.length > 0) {
      this.selectedMesh = intersects[0].object;
      this.selectedMesh.material.emissive.setHex(0x666666); // Highlight selected mesh

      // Dispatch custom event with selected mesh
      const selectEvent = new CustomEvent('meshSelected', {
        detail: { mesh: this.selectedMesh },
      });
      window.dispatchEvent(selectEvent);
    } else {
      this.selectedMesh = null;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const canvas = this.renderer.domElement;
    const parent = canvas.parentElement;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    // Update camera and renderer size based on the new container size
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
