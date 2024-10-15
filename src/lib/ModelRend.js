import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log('Error loading GLTF model:', error);
        reject(error);
      }
    );
  });
};

export const loadFBXModel = (scene, path, position, scale) => {
  const loader = new FBXLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.transparent = false;
          }
        });
        object.position.set(...position);
        object.scale.set(...scale);
        scene.add(object);
        resolve(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log('Error loading FBX model:', error);
        reject(error);
      }
    );
  });
};
