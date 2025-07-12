export function loadCanvas() {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d")

    const settings = {
        "gridSize": 0,
        "animationSpeed": 0,
        "autoScale": true,
        "width": window.innerWidth,
        "height": window.innerHeight,
        "ctx": ctx
    }

    canvas.width = settings.width
    canvas.height = settings.height


    return settings
}


function drawCellRandom(ctx, x, y, size) {
    let int = Math.floor(Math.random() * 2)

    if (int === 0) {
        ctx.fillStyle = "#ff8a8a"
        ctx.fillRect(x, y, size, size)
    }
}




function drawCell(ctx, x, y, size, pixelValue) {

    if (pixelValue === 0) {
        ctx.fillStyle = "#4d431a"
        ctx.fillRect(x, y, size, size)
    }


}

export function drawImage(settings) {
    let gridSize = settings["gridSize"]
    let width = settings["width"]
    let height = settings["height"]

    let ctx = settings['ctx']

    let cubeSize = width / gridSize

    let pixels = settings.image.data.length
    let imageWidth = settings.image.width
    let imageHeight = settings.image.height


    let translate_x = ((width / cubeSize) - imageWidth) / 2
    let translate_y = ((height / cubeSize) - imageHeight) / 2


    console.log(settings['autoScale'])

    while ((translate_x < 0 || translate_y < 0) && settings['autoScale']) {
        let int = +settings["gridSize"];
        int += 1;
        settings["gridSize"] = int;

        cubeSize = width / settings["gridSize"]

        translate_x = ((width / cubeSize) - imageWidth) / 2
        translate_y = ((height / cubeSize) - imageHeight) / 2
    }

    console.log(gridSize)

    let count = 0
    let x = translate_x
    let y = translate_y

    while (count !== pixels) {
        if (x === imageWidth + translate_x) {
            x = translate_x
            y += 1
        }

        const pixelValue = settings.image.data[count]



        drawCell(ctx, x*cubeSize, y*cubeSize, cubeSize, pixelValue)

        x += 1
        count += 1
    }
}


export function drawRandomGrid(settings) {
    let gridSize = settings["gridSize"]
    let width = settings["width"]
    let height = settings["height"]
    let ctx = settings['ctx']

    let cubeSize = width / gridSize

    for (let x = 0; x < width; x += width / gridSize) {
        for (let y = 0; y < height; y += width / gridSize) {
            drawCellRandom(ctx, x, y, cubeSize)
        }
    }
}


export function clearCanvas(settings) {
    settings.ctx.fillStyle = "#8282a8"
    settings.ctx.fillRect(0, 0, settings.width, settings.height)
}