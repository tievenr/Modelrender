import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { loadGLTFModel, loadFBXModel } from './lib/ModelRend';
import * as THREE from 'three';

function App ()
{
  useEffect( () =>
  {
    const test = new SceneInit( 'myThreeJsCanvas' );
    test.initialize();
    test.animate();

    const mixers = []; // Array to store mixers for each animated model
    const clock = new THREE.Clock();

    // Load GLTF Model 1
    loadGLTFModel(
      test.scene,
      './assets/ichiban/scene.gltf',
      [ -10, -2, 0 ],
      Math.PI,
      [ 5, 5, 5 ]
    ).then( ( gltf ) =>
    {
      if ( gltf.animations && gltf.animations.length > 0 )
      {
        const mixer = new THREE.AnimationMixer( gltf.scene );
        gltf.animations.forEach( ( clip ) =>
        {
          mixer.clipAction( clip ).play();
        } );
        mixers.push( mixer );
      }
    } );

    // Load GLTF Model 2
    // loadGLTFModel(
    //   test.scene,
    //   './assets/cloudstrife/source/cloud-psk.glb',
    //   [ 1, -2, 0 ],
    //   Math.PI * 3 / 2,
    //   [ 8, 8, 8 ]
    // ).then( ( gltf ) =>
    // {
    //   if ( gltf.animations && gltf.animations.length > 0 )
    //   {
    //     const mixer = new THREE.AnimationMixer( gltf.scene );
    //     gltf.animations.forEach( ( clip ) =>
    //     {
    //       mixer.clipAction( clip ).play();
    //     } );
    //     mixers.push( mixer );
    //   }
    // } );
    loadGLTFModel(
      test.scene,
      './assets/shark_fish_megalodon/scene.gltf',
      [ 1, -2, 0 ],
      Math.PI * 3 / 2,
      [ 8, 8, 8 ]
    ).then( ( gltf ) =>
    {
      if ( gltf.animations && gltf.animations.length > 0 )
      {
        const mixer = new THREE.AnimationMixer( gltf.scene );
        gltf.animations.forEach( ( clip ) =>
        {
          mixer.clipAction( clip ).play();
        } );
        mixers.push( mixer );
      }
    } );

    // Load FBX Model
    loadFBXModel(
      test.scene,
      'assets/Nier_2b/source/2b model rigging.fbx',
      [ 10, -1, 0 ],
      [ 0.1, 0.1, 0.1 ]
    ).then( ( fbx ) =>
    {
      if ( fbx.animations && fbx.animations.length > 0 )
      {
        const mixer = new THREE.AnimationMixer( fbx );
        fbx.animations.forEach( ( clip ) =>
        {
          mixer.clipAction( clip ).play();
        } );
        mixers.push( mixer );
      }
    } );

    // Animation loop
    const animate = () =>
    {
      requestAnimationFrame( animate );

      // Update mixers
      const delta = clock.getDelta();
      mixers.forEach( ( mixer ) => mixer.update( delta ) );

      test.render();
      test.controls.update();
    };
    animate();
  }, [] );

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
