// THREE.JS SCENE SETUP

import * as THREE from "../third-party/three.module.js";
import { FresnelShader } from '../third-party/FresnelShader.js';

// pass in the Scene object as an arguemnt to create a point light
export function createPointLights(scene) {

    if (scene !== undefined) {
        const pointLight = new THREE.DirectionalLight(0xffc4f3, 0.5); // pink
        pointLight.position.set(-10, -10, -10);
        // const pointLight2 = new THREE.DirectionalLight(0x538258, 0.4); // green
        // pointLight2.position.set(2, 10, 5);
        scene.add(pointLight);
    }

    // if the argument is undefined, throw an appropriate error
    if (scene === undefined) {
        console.error(
            "You are missing an argument. You must specify a scene to add the point light to"
        );
    }
}

// pass in the Scene object as an argument to create an ambient light
export function createAmbientLight(scene) {

    if (scene !== undefined) {
        const ambientLight = new THREE.HemisphereLight(0x303F9F, 0x6e738f, 0.2); // ground colour is dark blue, sky colour is a lighter blue
        scene.add(ambientLight);
    }

    // if the argument is undefined, throw an appropriate error
    if (scene === undefined) {
        console.error(
            "You are missing an argument. You must specify a scene to add the ambient light to"
        );
    }
}

export function createCamera(scene) {
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 350);
    camera.lookAt(scene.position);
    return camera;
}

// create a WebGL renderer to render the scene so we can view it, passing in the container to append it to, and the width and height of the viewport as arguments
export function createRenderer(container, width, height) {

    if (container !== undefined && width !== undefined && height !== undefined) {
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height); // set size of output canvas to (width, height) with device pixel ratio taken into account and set viewport to fit this size
        container.appendChild(renderer.domElement);
        return renderer;
    }

    // if any arguments are undefined, throw appropriate errors
    if (container === undefined) {
        console.error(
            "You are missing an argument. You must specify the container to append the renderer to"
        );
    }
    if (width === undefined || height === undefined) {
        console.error(
            "You are missing arguments. You must specify the width and height of the renderer"
        );
    }
}

export function createCubeMapTexture(){
    const path = "../third-party/textures/";
    const format = '.jpg';
    const urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ];

    const textureCube = new THREE.CubeTextureLoader().load( urls );
    
    const shader = FresnelShader;
    const uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms[ "tCube" ].value = textureCube;

    return { textureCube, shader, uniforms };
}