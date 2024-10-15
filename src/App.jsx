import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { loadGLTFModel, loadFBXModel } from './lib/ModelRend';

function App ()
{
  useEffect( () =>
  {
    const test = new SceneInit( 'myThreeJsCanvas' );
    test.initialize();
    test.animate();

    loadGLTFModel(
      test.scene,
      './assets/ichiban/scene.gltf',
      [ -10, -2, 0 ],
      Math.PI,
      [ 5, 5, 5 ]
    );

    loadGLTFModel(
      test.scene,
      './assets/cloudstrife/source/cloud-psk.glb',
      [ 1, -2, 0 ],
      Math.PI * 3 / 2,
      [ 8, 8, 8 ]
    );

    loadFBXModel(
      test.scene,
      'assets/Nier_2b/source/2b model rigging.fbx',
      [ 10, -1, 0 ],
      [ 0.1, 0.1, 0.1 ]
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