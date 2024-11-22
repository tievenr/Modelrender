
# **Implementation of the Upload Button for the DT Platform**

## **Project Overview**

This repository is a foundational setup for creating, rendering, and uploading 3D models using Three.js and Supabase. The project includes utilities for setting up a 3D scene, loading models (GLTF/FBX), managing animations, and integrating a file upload feature for storage.

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/tievenr/Modelrender.git
cd Modelrender
```

### **2. Install Dependencies**

Ensure you have Node.js installed on your machine. Then, run:

```bash
npm install
```

This will install all the required packages, including Three.js and Supabase libraries.

### **3. Configure Supabase**

- Set up a [Supabase](https://supabase.com) project.
- Create a bucket in Supabase storage to store the 3D models.
- Copy your Supabase URL, anonymous key, and bucket name, then add them to a `.env` file in the project root:

  ```env
  VITE_SUPABASE_URL=<your-supabase-url>
  VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
  VITE_SUPABASE_BUCKET_NAME=<your-supabase-bucket-name>


### **4. Start the Development Server**

Run the following command to start the development server:

```bash
npm run dev
```

### **/lib/SceneInit.js**

The `ModelRender` class in this file provides a boilerplate for setting up a 3D scene using Three.js. This includes initializing the scene, camera, lighting, and renderer for a quick setup.

### **/lib/ModelRend.js**

This file contains utilities for loading 3D models and managing animations.

#### Key Features:
1. **`setupAnimations(model, mixers)`**: Plays animations for loaded models.
2. **`loadGLTFModel(scene, path, position, rotation, scale)`**: Loads and adds GLTF/GLB models to the scene.
3. **`loadFBXModel(scene, path, position, scale)`**: Loads and adds FBX models to the scene.
4. **`setupAnimationLoop(test, mixers, clock)`**: Creates a render loop for animation playback.

### **/lib/uploadUtilis.js**

This module handles the upload functionality for 3D models. It:
- Validates model files (.gltf, .glb, .fbx).
- Uploads files to a Supabase bucket with a unique filename.
- Tracks upload progress and retrieves a public URL for the uploaded file.

---

## **Usage**

### **1. Rendering 3D Models**
- Use `loadGLTFModel` or `loadFBXModel` to load and display 3D models in the scene.
- Call `setupAnimations` for animating models with built-in animation clips.
- Use `setupAnimationLoop` to ensure the animations run smoothly.

### **2. Uploading 3D Models**
- The upload button triggers the `createFileUploader` function.
- The uploaded file is stored in the Supabase bucket, and a public URL is returned for further use.

---
```
