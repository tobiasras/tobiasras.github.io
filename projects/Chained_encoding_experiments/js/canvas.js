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





export function clearCanvas(settings) {
    settings.ctx.fillStyle = "#000000"
    settings.ctx.fillRect(0, 0, settings.width, settings.height)
}