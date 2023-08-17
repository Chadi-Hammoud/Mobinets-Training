import * as THREE from './node_modules/three'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { Scene } from './node_modules/three';

const renderer = new THREE.WebGLRenderer();



// Instantiate a loader.

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const loader = new GLTFLoader();
// const scene = new Scene()
// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );


// Load a glTF resource
loader.load(
    // resource URL
    './assets/server/scene.gltf',
    // called when the resource is loaded
    function (gltf) {

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        render();

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);


function render() {

    renderer.render( scene, camera );

}

// loader.load( '.assets/server/scene.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );