
let shaderProgram;
let frameCounter = 0;

let size = 0.09;
size_increment = 0.01;
max_size = 1
min_size = 0



function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.frag');
}

function canvasSize() {
  const vv = window.visualViewport;
  if (vv) {
    return [Math.round(vv.width), Math.round(vv.height)];
  }
  return [windowWidth, windowHeight];
}

function setup() {
  pixelDensity(1);

  const [w, h] = canvasSize();
  const canvas = createCanvas(w, h, WEBGL);
  canvas.parent('sketch-container');

  noStroke();

  // setup listerners
  addEventListener("wheel", onMouseWheelScroll)

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportChange);
  }
}

function onViewportChange() {
  const [w, h] = canvasSize();
  resizeCanvas(w, h);
}

// runs all the time
function draw() {
  shader(shaderProgram);

  let time_val = millis() * 0.001;

  shaderProgram.setUniform('u_time', time_val);
  shaderProgram.setUniform('u_scroll', size);

  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_mouse', [mouseX, height - mouseY]);

  rect(-width / 2, -height / 2, width, height);

  frameCounter++;
}

function windowResized() {
  const [w, h] = canvasSize();
  resizeCanvas(w, h);
}











function onMouseWheelScroll(event) {
  console.log(size)
  const movement = event.deltaY
  let dir = 0;
  if (movement < 0) {
    dir = 1
  } else {
    dir = -1
  }
  const force = size_increment * dir
  
  const result = force + size
  if (result < min_size || result > max_size ){
    return
  }
  size += force
}


