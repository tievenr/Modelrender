# The Implementation of the Upload Button for the DT Platform

## /lib/SceneInit.js

The `ModelRender` class provides a ready-to-use boilerplate for setting up and rendering a 3D scene using Three.js. This includes setting up the camera, lighting, and other mundane tasks to create a simple canvas for viewing the scene.

## /lib/ModelRend.js

This file contains utility functions to load 3D models (GLTF and FBX formats) and set up animations and an animation loop using Three.js.

### **1. `setupAnimations(model, mixers)`**

This function initializes and plays animations for a given model.
- **Parameters**:
  - `model`: A model object (e.g., from `GLTFLoader` or `FBXLoader`), which may include animation clips.
  - `mixers`: An array to store `AnimationMixer` instances. This allows managing animations for multiple models simultaneously.

- **Behavior**:
  - Detects and sets up all animations found in the model.
  - Starts playing animations immediately upon setup.

---

### **2. `loadGLTFModel(scene, path, position, rotation, scale)`**

Loads a GLTF/GLB model, applies transformations, and adds it to the provided scene.

- **Parameters**:
  - `scene`: The Three.js scene where the model will be added.
  - `path`: Path to the `.gltf` or `.glb` file.
  - `position`: An array `[x, y, z]` for the model's position.
  - `rotation`: A rotation angle (in radians) for the Y-axis.
  - `scale`: An array `[x, y, z]` for the model's scale.

- **Returns**:
  - A `Promise` that resolves with the loaded GLTF model object.

---

### **3. `loadFBXModel(scene, path, position, scale)`**

Loads an FBX model, applies transformations, and adds it to the provided scene.

- **Parameters**:
  - `scene`: The Three.js scene where the model will be added.
  - `path`: Path to the `.fbx` file.
  - `position`: An array `[x, y, z]` for the model's position.
  - `scale`: An array `[x, y, z]` for the model's scale.

- **Returns**:
  - A `Promise` that resolves with the loaded FBX object.

---

### **4. `setupAnimationLoop(test, mixers, clock)`**

Creates a render loop to synchronize animations and updates for a scene.

- **Parameters**:
  - `test`: An object containing the `render()` and `controls.update()` methods, typically the Three.js renderer and controls.
  - `mixers`: An array of `AnimationMixer` instances for controlling animations.
  - `clock`: A `THREE.Clock` instance to calculate the delta time for animation updates.

- **Behavior**:
  - Updates all animation mixers with the delta time at each frame.
  - Calls `render()` for rendering the scene and `update()` for OrbitControls or other camera controls.

--- 
## /lib/uploadUtilis.js
This module exports a createFileUploader function that handles the process of uploading 3D model files (.gltf, .glb, .fbx) to a Supabase storage bucket. It creates a dynamic file input element, validates the file type, and uploads the file to Supabase using the supabase.storage.from().upload() method. The file’s name is uniquely generated using uuidv4() to prevent collisions. The function tracks the upload progress and updates the UI through the setUploadProgress callback. Upon successful upload, it retrieves a public URL for the file.