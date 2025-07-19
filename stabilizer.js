
import { currentQuaternion } from './sensor.js';

let filteredQ = [1, 0, 0, 0];

export function updateStabilizedQuaternion() {
  const alpha = 0.1;
  for (let i = 0; i < 4; i++) {
    filteredQ[i] = filteredQ[i] * (1 - alpha) + currentQuaternion[i] * alpha;
  }
  return [filteredQ[0], -filteredQ[1], -filteredQ[2], -filteredQ[3]];
}
