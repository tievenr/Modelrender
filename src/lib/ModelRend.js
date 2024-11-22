import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Sets up animations for the model if available.
 * @param {Object} model - The 3D model.
 * @param {Array} mixers - Array to store animation mixers.
 */
export const setupAnimations = (model, mixers) => {
  if (model.animations && model.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model.scene || model);
    model.animations.forEach((clip) => mixer.clipAction(clip).play());
    mixers.push(mixer);
  }
};

/**
 * Loads a GLTF model into the scene.
 * @param {THREE.Scene} scene - The scene to add the model to.
 * @param {string} path - Model path or URL.
 * @param {Array} position - Position to place the model.
 * @param {number} rotation - Rotation around the Y-axis.
 * @param {Array} scale - Scale for the model.
 * @returns {Promise} - Resolves with the loaded model.
 */
export const loadGLTFModel = (scene, path, position, rotation, scale) => {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltfScene) => {
        gltfScene.scene.rotation.y = rotation;
        gltfScene.scene.position.set(...position);
        gltfScene.scene.scale.set(...scale);
        scene.add(gltfScene.scene);
        resolve(gltfScene);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => {
        console.log('Error loading GLTF model:', error);
        reject(error);
      }
    );
  });
};

/**
 * Loads an FBX model into the scene.
 * @param {THREE.Scene} scene - The scene to add the model to.
 * @param {string} path - Model path or URL.
 * @param {Array} position - Position to place the model.
 * @param {Array} scale - Scale for the model.
 * @returns {Promise} - Resolves with the loaded model.
 */
export const loadFBXModel = (scene, path, position, scale) => {
  const loader = new FBXLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) child.material.transparent = false;
        });
        object.position.set(...position);
        object.scale.set(...scale);
        scene.add(object);
        resolve(object);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => {
        console.log('Error loading FBX model:', error);
        reject(error);
      }
    );
  });
};

/**
 * Runs the animation loop and updates mixers.
 * @param {Object} test - The 3D scene instance.
 * @param {Array} mixers - Array of animation mixers.
 * @param {THREE.Clock} clock - Clock for delta time.
 */
export const setupAnimationLoop = (test, mixers, clock) => {
  requestAnimationFrame(() => setupAnimationLoop(test, mixers, clock));
  const delta = clock.getDelta();
  mixers.forEach((mixer) => mixer.update(delta));
  test.render();
  test.controls.update();
};
