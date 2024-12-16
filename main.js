import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WiggleRigHelper } from "wiggle/helper";
// import { WiggleBone } from "wiggle";
import { WiggleBone } from "wiggle/spring";
// Variables
let animate_model = true;
let model, mixer; // For the model and animation mixer

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1A1A1D); // Set a light gray background color

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 100); // White point light
light.position.set(10, 10, 10); // Position the light
scene.add(light);

// Add Ambient Light (soft, even lighting)
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

// Add Directional Light for strong directional illumination
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2); // White directional light
directionalLight.position.set(0, 10, 5); // Positioning it from above
scene.add(directionalLight);

// Load model
const loader = new GLTFLoader();



loader.load('/DANIELDEGEER2.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Find the skinned mesh in the model
    let mesh;
    model.traverse((object) => {
        if (object.isSkinnedMesh) {
            mesh = object;
        }
    });

    if (mesh) {
        let rootBone;
        const wiggleBones = [];

        mesh.skeleton.bones.forEach((bone) => {
            if (!bone.parent.isBone) {
                rootBone = bone;
            } else {
                const wiggleBone = WiggleBone(bone, {
                    velocity: 0.5,
                });
                wiggleBones.push(wiggleBone);
            }
        });

        // Helper function to update wiggle bones
        function updateWiggle(time) {
            if (rootBone) {
                rootBone.position.x = Math.sin(time * 0.001);
                wiggleBones.forEach((wiggleBone) => {
                    wiggleBone.update();
                });
            }
            requestAnimationFrame(updateWiggle);
        }
        updateWiggle(0);
    }

}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 5;

// Main animation loop
function animate() {
    // Update the model's baked animation if available
    if (mixer) {
        mixer.update(0.01); // Update the animation mixer
    }

    // Rotate the model from lying to standing if animate_model is true
    if (animate_model && model) {
        // Gradually rotate model around the X-axis from laying to standing
        if (model.rotation.x < Math.PI / 2) {
            model.rotation.x += 0.0001;  // Slower rotation to stand up (adjust as needed)
        }
    }

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(animate);
}