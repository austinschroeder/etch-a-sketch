// Select elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const moveAmount = 10;
const canvasWr = document.querySelector('#canvasWr'); 
// Setup HTML canvas for drawing
const { width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 10;

let hue = 0

// ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.strokeStyle = `dimgray`;

ctx.beginPath(); // Start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
  // Increment hue
  // hue += 5;
  // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`


  ctx.beginPath();
  ctx.moveTo(x,y)

  switch (key) {
    case 'ArrowUp':
      y -= moveAmount
      break;
    case 'ArrowDown':
      y += moveAmount
      break;
    case 'ArrowLeft':
      x -= moveAmount
      break;
    case 'ArrowRight':
      x += moveAmount
      break;  
    default:
      break;
  }
  ctx.lineTo(x,y);
  ctx.stroke();

}

//Write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
// Clear/shake function
function clearCanvas() {
  canvasWr.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvasWr.addEventListener('animationend', function() {
    canvasWr.classList.remove('shake');
  }, { once: true })
}


// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
