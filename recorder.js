
let mediaRecorder;
let recordedChunks = [];

export function startVideoRecording(canvas) {
  const stream = canvas.captureStream(60); // 60 fps
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  recordedChunks = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '3d_motion_video.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  mediaRecorder.start();
}

export function stopVideoRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  }
}
