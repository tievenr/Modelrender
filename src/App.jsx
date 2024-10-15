import { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';

function App ()
{
  useEffect( () =>
  {
    const test = new SceneInit( 'myThreeJsCanvas' );
    test.initialize();
    test.animate();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      './assets/ichiban/scene.gltf',
      ( gltfScene ) =>
      {
        gltfScene.scene.rotation.y = Math.PI;
        gltfScene.scene.position.set( -10, -2, 0 );
        gltfScene.scene.scale.set( 5, 5, 5 );
        test.scene.add( gltfScene.scene );
      },
      ( xhr ) =>
      {
        console.log( ( xhr.loaded / xhr.total ) * 100 + '% loaded' );
      },
      ( error ) =>
      {
        console.log( 'Error loading GLTF model:', error );
      }
    );

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      'assets/Nier_2b/source/2b model rigging.fbx',
      ( object ) =>
      {
        object.traverse( ( child ) =>
        {
          if ( child.isMesh )
          {
            child.material.transparent = false;
          }
        } );

        object.position.set( 10, -1, 0 );
        object.scale.set( 0.1, 0.1, 0.1 );
        test.scene.add( object );
      },
      ( xhr ) =>
      {
        console.log( ( xhr.loaded / xhr.total ) * 100 + '% loaded' );
      },
      ( error ) =>
      {
        console.log( 'Error loading FBX model:', error );
      }
    );

    const animate = () =>
    {
      requestAnimationFrame( animate );
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
