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
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight, // Will be updated dynamically later
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

    // Window resize handling
    window.addEventListener('resize', () => this.onWindowResize(), false);
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
