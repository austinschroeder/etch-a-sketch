// Select elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const moveAmount = 10;
// Setup HTML canvas for drawing
// const width = canvas.width;
// const height = canvas.height;
const { width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = moveAmount;

let hue = 0

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

ctx.beginPath(); // Start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
  // Increment hue
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

  console.log(key);
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
    console.log('HANDLING KEY');
  }
}
// Clear/shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  }, { once: true })
}


//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
