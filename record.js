
let recording = false;
let recordedData = [];

export function startRecording() {
  recording = true;
  recordedData = [];
}

export function stopRecording() {
  recording = false;
}

export function isRecording() {
  return recording;
}

export function recordQuaternion(q) {
  if (!recording) return;
  const timestamp = performance.now();
  recordedData.push([timestamp, ...q]);
}

export function exportCSV() {
  if (recordedData.length === 0) return null;

  const header = ['timestamp', 'w', 'x', 'y', 'z'];
  const csvRows = [header.join(',')];

  recordedData.forEach(row => {
    csvRows.push(row.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  return URL.createObjectURL(blob);
}
