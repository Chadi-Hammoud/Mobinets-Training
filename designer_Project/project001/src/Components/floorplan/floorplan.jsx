import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Floorplan = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // Create server and PC models
    const serverGeometry = new THREE.BoxGeometry(1, 1, 1);
    const serverMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const server = new THREE.Mesh(serverGeometry, serverMaterial);
    server.position.set(1, 0.5, 1);
    scene.add(server);

    const pcGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const pcMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const pc = new THREE.Mesh(pcGeometry, pcMaterial);
    pc.position.set(2, 0.25, 2);
    scene.add(pc);

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={containerRef} />;
};

export default Floorplan;
