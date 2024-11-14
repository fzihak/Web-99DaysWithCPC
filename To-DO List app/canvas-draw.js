const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;
let color = '#e94560';
let lineWidth = 5;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseout', () => (drawing = false));

function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
  color = e.target.value;
});

document.getElementById('lineWidth').addEventListener('input', (e) => {
  lineWidth = e.target.value;
});
