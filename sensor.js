
export let currentQuaternion = [1, 0, 0, 0];

function eulerToQuaternion(alpha, beta, gamma) {
  const _x = beta * Math.PI / 180;
  const _y = gamma * Math.PI / 180;
  const _z = alpha * Math.PI / 180;

  const cX = Math.cos(_x / 2);
  const cY = Math.cos(_y / 2);
  const cZ = Math.cos(_z / 2);
  const sX = Math.sin(_x / 2);
  const sY = Math.sin(_y / 2);
  const sZ = Math.sin(_z / 2);

  const w = cX * cY * cZ - sX * sY * sZ;
  const x = sX * cY * cZ - cX * sY * sZ;
  const y = cX * sY * cZ + sX * cY * sZ;
  const z = cX * cY * sZ + sX * sY * cZ;

  return [w, x, y, z];
}

window.addEventListener('deviceorientation', (event) => {
  const { alpha, beta, gamma } = event;
  currentQuaternion = eulerToQuaternion(alpha, beta, gamma);
});
