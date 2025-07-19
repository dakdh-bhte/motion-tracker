
import { updateStabilizedQuaternion } from './stabilizer.js';
import { recordQuaternion, startRecording, stopRecording, exportCSV, isRecording } from './record.js';
import { startVideoRecording, stopVideoRecording } from './recorder.js';

const canvas = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(canvas.width, canvas.height);
camera.position.z = 3;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
scene.add(cube);

// UI Buttons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const startVideoBtn = document.getElementById('startVideoBtn');
const stopVideoBtn = document.getElementById('stopVideoBtn');

startBtn.addEventListener('click', () => {
  startRecording();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  downloadBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  stopRecording();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  downloadBtn.disabled = false;
});

downloadBtn.addEventListener('click', () => {
  const url = exportCSV();
  if (url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'motion_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
});

startVideoBtn.addEventListener('click', () => {
  startVideoRecording(canvas);
  startVideoBtn.disabled = true;
  stopVideoBtn.disabled = false;
});

stopVideoBtn.addEventListener('click', () => {
  stopVideoRecording();
  startVideoBtn.disabled = false;
  stopVideoBtn.disabled = true;
});

function animate() {
  requestAnimationFrame(animate);

  const q = updateStabilizedQuaternion();
  camera.quaternion.set(q[1], q[2], q[3], q[0]);

  if (isRecording()) {
    recordQuaternion(q);
  }

  renderer.render(scene, camera);
}

animate();
