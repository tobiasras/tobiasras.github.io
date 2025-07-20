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



function drawCell(ctx, x, y, size, pixelValue) {

    if (pixelValue > 240) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(x, y, size, size)
    }


}

export function drawImage(settings) {
    let ctx = settings['ctx']

    let gridSize = settings["gridSize"]
    let width = settings["width"]
    let height = settings["height"]


    let cubeSize = width / gridSize

    let pixels = settings.image.data.length
    let imageWidth = settings.image.width
    let imageHeight = settings.image.height

    let translate_x = ((width / cubeSize) - imageWidth) / 2
    let translate_y = ((height / cubeSize) - imageHeight) / 2

    while ((translate_x < 0 || translate_y < 0) && settings['autoScale']) {
        let int = +settings["gridSize"];
        int += 1;
        settings["gridSize"] = int;

        cubeSize = width / settings["gridSize"]

        translate_x = ((width / cubeSize) - imageWidth) / 2
        translate_y = ((height / cubeSize) - imageHeight) / 2
    }

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




export function clearCanvas(settings) {
    settings.ctx.fillStyle = "#000000"
    settings.ctx.fillRect(0, 0, settings.width, settings.height)
}