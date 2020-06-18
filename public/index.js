import * as THREE from "./third-party/three.module.js"; // using Three.js to create 3D scene and objects
import { OrbitControls } from "./third-party/OrbitControls.js"; // Orbit Controls allow navigation with the mouse and trackpad
import * as SceneSetup from "./build/scene.js"; // All my Three.js scene setup code is in here
import * as Pages from "./build/pages.js"; // Contains code regarding the landing page and loading screen of the webpage
import * as Media from "./build/media.js"; // Code related to user media: getting and processing webcam/microphone streams
import { createFaceObject, createBubbles } from "./build/tracker.js"; // code for the objects that populate the scene: face mesh and bubbles

let container, scene, textureCube, camera, renderer, controls; // Three.js scene setup
let video, model; // for @tensorflow/facemesh setup
let flipHorizontal = true; // flip video so that the stream is mirrored
let width = 0, height = 0; // initial values for the width and height of the video stream
let faceGeometry; // 3D facemesh object
let userMouth; // object containing coordinates of user mouth
let bubbles; // to store an array containing bubble objects
let soundArray = []; // to store an array containing the two most recent sound values
let mic, sound, start, end; // audio stream variables
let scale, x; // to manipulate size of bubble objects
let count = 0; // to loop through the bubble objects array
const numberOfBubbles = 3;
let audioChunks = [];
let audioArray = [];

const landingPage = document.getElementById("landing-page"); // landing page div
const loadingScreen = document.getElementById("loading-screen"); // loading screen div

function main() {

  // create landing page and loading screen
  Pages.createLandingPageText(landingPage);
  Pages.createLoadingScreen(loadingScreen);
  const button = Pages.createButton(landingPage);

  // if the "enter" button is pressed, start the sketch
  Pages.buttonPressed(button, landingPage).then((clicked) => {
    console.log("clicked");
    if (clicked === true) {
      const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.smoothingTimeConstant = 0.2;
      init(audioCtx, analyser);
    }
  })
}

async function init(audioCtx, analyser) {

  // initialise video and audio streams
  try {
    video = await Media.loadStream(audioCtx, analyser);
  } catch (err) {
    throw err;
  }

  // show loading page while model is loading
  detect(video, model).then(() => {
    Pages.hideDiv(loadingScreen);
  });

  const audioRecorder = Media.createAudioRecorder();

  // scene setup
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();
  textureCube = SceneSetup.createCubeMapTexture().textureCube;
  scene.background = textureCube;
  camera = SceneSetup.createCamera(scene);
  renderer = SceneSetup.createRenderer(container, width, height);
  controls = new OrbitControls(camera, renderer.domElement);

  // create user face object
  faceGeometry = createFaceObject(scene, width, height);
  bubbles = createBubbles(numberOfBubbles, scene);

  // set width and height according to video dimensions
  if (width !== video.videoWidth || height !== video.videoHeight) {
    const w = video.videoWidth;
    const h = video.videoHeight;
    width = w;
    height = h;
    resize();
    faceGeometry.setSize(w, h);
  }

  // render scene
  renderer.setAnimationLoop(() => {
    detect(video, model)
      .then(predictions => {
        // draw face mesh and get user mouth tracking point
        userMouth = drawFace(predictions);

        // process microphone stream
        mic = Media.getSound(analyser, soundArray, 100);
        start = mic.soundStart;
        end = mic.soundEnd;
        sound = mic.sound;

        // if the start of a sound input is detected, initialise a bubble
        if (start) {
          audioRecorder.start();
          console.log(`Start of sound input \nRecorder: ${audioRecorder.state}`);
        }
        // if sound is being detected, increase bubble size logarithmically
        if (sound) {
          audioRecorder.ondataavailable = (e) => {
            audioChunks.push(e.data);
          }
          console.log("Sound being received and recorded");
          scale = Math.log(x + 1) * 30;
          bubbles[count].update(scale, userMouth);
          x++;
        }
        // if the sound input ends, release the bubble
        if (end) {
          audioRecorder.stop();
          console.log(`End of sound input \nRecorder: ${audioRecorder.state}`);
          const audio = document.createElement('audio');
          const blob = new Blob(audioChunks, {
            'type': 'audio/ogg; codecs=opus'
          });
          const audioURL = URL.createObjectURL(blob);
          audio.src = audioURL;
          audioArray.push(audio);
          if (audioArray.length > numberOfBubbles) {
            audioArray.splice(0, audioArray.length - numberOfBubbles);
          }
          console.log(audioArray);
          scale = 0;
          x = 0;
          count++;
          if (count === bubbles.length) count = 0;
        }

        // render all the bubbles
        for (let i = 0; i < bubbles.length; i++) {
          bubbles[i].display();
        }
      })
      .catch(err => console.error(err));
    renderer.render(scene, camera);
  });

  // if the user resizes the window, adjust everything accordingly
  window.addEventListener("resize", () => {
    resize();
  });
}

// @tensorflow-models/facemesh code
async function detect(video, model) {
  model = await facemesh.load({
    maxFaces: 1
  });
  const predictions = await model.estimateFaces(video, false, flipHorizontal);
  return predictions;
}

// draw the user's face geometry and return the mouth tracking points
function drawFace(predictions) {
  if (predictions.length > 0) {
    faceGeometry.update(predictions[0], flipHorizontal);
    let mouth = faceGeometry.track(38, 268, 15);
    return mouth;
  }
}

// make sure the sketch fits the dimensions of the client browser window
function resize() {
  const videoAspectRatio = width / height;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowAspectRatio = windowWidth / windowHeight;
  let adjustedWidth;
  let adjustedHeight;
  if (videoAspectRatio < windowAspectRatio) {
    adjustedWidth = windowWidth;
    adjustedHeight = windowWidth / videoAspectRatio;
  } else {
    adjustedWidth = windowHeight * videoAspectRatio;
    adjustedHeight = windowHeight;
  }
  renderer.setSize(adjustedWidth, adjustedHeight);
  camera.aspect = videoAspectRatio;
  camera.updateProjectionMatrix();
}

main();