import {loadCanvas, clearCanvas, drawImage} from "./canvas.js";
import {setupInputListeners, updateUI} from "./ui.js"
import {processImage} from "./imageProcessing.js";

let settings = loadCanvas()

setupInputListeners(settings, () => {})


settings['image'] = await processImage()


let isRunning = true;
let speed = settings.animationSpeed; // steps per second
let delay = 1000 / speed;


function gameLoop() {
    let delay = 1000 / settings.animationSpeed;

    if (!isRunning) return;

    clearCanvas(settings);

    drawGrid();    // Render the new state


    updateUI()
    setTimeout(gameLoop, delay); // Wait and then call again
}


function drawGrid(state) {
    //drawRandomGrid(settings)
    drawImage(settings)
}

// Controls to adjust speed
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        speed = Math.min(60, speed + 1);
    } else if (e.key === "ArrowDown") {
        speed = Math.max(1, speed - 1);
    }
    delay = 1000 / speed;
});

// Start the animation
gameLoop();


















