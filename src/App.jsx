import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { loadGLTFModel, loadFBXModel, setupAnimations, setupAnimationLoop } from './lib/ModelRend';
import * as THREE from 'three';

function App ()
{
  useEffect( () =>
  {
    const test = new SceneInit( 'myThreeJsCanvas' );
    test.initialize();
    test.animate();

    const mixers = [];
    const clock = new THREE.Clock();

    // Load Ichiban GLTF Model
    loadGLTFModel(
      test.scene,
      './assets/ichiban/scene.gltf',
      [ -10, -2, 0 ],
      Math.PI,
      [ 5, 5, 5 ]
    ).then( ( gltf ) =>
    {
      setupAnimations( gltf, mixers );
    } );

    // Load Cloud GLTF Model
    loadGLTFModel(
      test.scene,
      './assets/cloudstrife/source/cloud-psk.glb',
      [ 1, -2, 0 ],
      Math.PI * 3 / 2,
      [ 8, 8, 8 ]
    ).then( ( gltf ) =>
    {
      setupAnimations( gltf, mixers );
    } );

    // Load Shark GLTF Model
    loadGLTFModel(
      test.scene,
      './assets/shark_fish_megalodon/scene.gltf',
      [ 1, -2, 0 ],
      Math.PI * 3 / 2,
      [ 8, 8, 8 ]
    ).then( ( gltf ) =>
    {
      setupAnimations( gltf, mixers );
    } );

    // Load 2B FBX Model
    loadFBXModel(
      test.scene,
      'assets/Nier_2b/source/2b model rigging.fbx',
      [ 10, -1, 0 ],
      [ 0.1, 0.1, 0.1 ]
    ).then( ( fbx ) =>
    {
      setupAnimations( fbx, mixers );
    } );

    // Start animation loop
    setupAnimationLoop( test, mixers, clock );

  }, [] );

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;