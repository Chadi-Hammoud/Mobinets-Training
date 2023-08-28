import React from 'react';
import './App.css';
import DragAndDropPanel from './Components/DragAndDropPanel/DragAandDropPanel';
import * as THREE from 'three';

const App = () => {
  // Initialize Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  
  renderer.setSize(window.innerWidth / 2, window.innerHeight);
  document.getElementById('3d-scene').appendChild(renderer.domElement);

  // Create a simple cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Set camera position
  camera.position.z = 5;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  return (
    <div className="App">
      <div id="3d-scene" style={{ display: 'inline-block' }}></div>
      <DragAndDropPanel />
    </div>
  );
};

export default App;
