import React, { useEffect, useState } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import{loadGLTFModel,loadFBXModel,setupAnimations, setupAnimationLoop,} from "./lib/ModelRend";
import { createFileUploader } from "./lib/uploadUtilis";

function App ()
{
  const [ uploading, setUploading ] = useState( false ); // Track upload state
  const [ uploadProgress, setUploadProgress ] = useState( 0 ); // Track upload progress
  const [ latestModel, setLatestModel ] = useState( null ); // Store the latest uploaded model
  const [ sceneInstance, setSceneInstance ] = useState( null ); // Store the 3D scene instance
  const [ mixers, setMixers ] = useState( [] ); // Store animation mixers
  const [ error, setError ] = useState( null ); // Store error message

  // Initialize scene and animation loop
  useEffect( () =>
  {
    const test = new SceneInit( "myThreeJsCanvas" );
    test.initialize();
    test.animate();

    const newMixers = [];
    const clock = new THREE.Clock();
    setupAnimationLoop( test, newMixers, clock );

    setSceneInstance( test );
    setMixers( newMixers );
  }, [] );

  // Handle file upload
  const handleUpload = createFileUploader(
    setError,
    setUploading,
    setUploadProgress,
    setLatestModel
  );

  // Load model into scene based on file type
  const loadModelIntoScene = ( model ) =>
  {
    const position = [ 0, 0, 0 ];
    const scale = [ 0.5, 0.5, 0.5 ];

    if ( model.url.endsWith( ".fbx" ) )
    {
      loadFBXModel( sceneInstance.scene, model.url, position, scale ).then( ( fbx ) =>
        setupAnimations( fbx, mixers )
      );
    } else
    {
      loadGLTFModel( sceneInstance.scene, model.url, position, 0, scale ).then( ( gltf ) =>
        setupAnimations( gltf, mixers )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">3D Model Viewer</h1>

      {/* Canvas for 3D scene */}
      <div className="w-full max-w-5xl mb-8 rounded-xl overflow-hidden shadow-2xl">
        <canvas
          id="myThreeJsCanvas"
          className="w-full h-[600px] bg-gray-950 border border-gray-700"
        />
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Upload button and progress bar */}
        <div className="flex flex-col items-center gap-4">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
              ${ uploading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700" }`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? `Uploading... ${ uploadProgress }%` : "Upload 3D Model"}
          </button>

          {uploading && (
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${ uploadProgress }%` }}
              />
            </div>
          )}
        </div>

        {/* Latest uploaded model */}
        {latestModel && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Latest Uploaded Model</h3>
            <div className="flex justify-between items-center gap-4 bg-gray-900 p-4 rounded-lg">
              <span className="truncate text-sm text-gray-300">
                {latestModel.name}
              </span>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={() => loadModelIntoScene( latestModel )}
              >
                Load Model
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
