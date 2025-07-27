import {loadCanvas, clearCanvas} from "./canvas.js";
import {setupInputListeners, updateUI} from "./ui.js"
import {processImage} from "./imageProcessing.js";

let settings = loadCanvas()

setupInputListeners(settings, () => {})

const image = await processImage("./assets/building.png")
settings.image = image

let isRunning = true;

const size =  Math.floor(settings.height / settings.image.height)


settings.drawSettings = {
    size: size,
    translateX: (settings.width - (settings.image.width *size )) / 2,
    translateY: (settings.height - (settings.image.height * size)) / 2
}



clearCanvas(settings)
let index = 0

function gameLoop() {
    let delay = 1000 / settings.animationSpeed;

    if (!isRunning) return;

    draw(settings, index)

    updateUI()
    index += 1
    setTimeout(gameLoop, delay); // Wait and then call again
}


function draw(settings, index) {
    let animation = settings.image.animation
    animation.forEach(blob => {
        if (blob[index]) {
            draw_cell(settings, blob[index])
        }
    })
}








function draw_cell(settings, {x, y}) {
    const ctx = settings.ctx;
    const {size, translateX, translateY } = settings.drawSettings

    const drawX = Math.floor((x * size) + translateX  ) ;
    const drawY = Math.floor((y * size  + translateY));

    ctx.fillStyle = "#c2620d";
    ctx.fillRect(drawX, drawY, size, size);  // Use fillRect directly
}

// Start the animation
gameLoop();












