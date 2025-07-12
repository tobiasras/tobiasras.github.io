export async function processImage() {
    console.log("loading image")


    const imageBitMap = await loadImage()
    if (imageBitMap === undefined) return

    let width = imageBitMap.width
    let height = imageBitMap.height

    const offscreen = new OffscreenCanvas(imageBitMap.width, imageBitMap.height)
    const ctx = offscreen.getContext("2d")

    ctx.drawImage(imageBitMap, 0,0)

    const imageData = ctx.getImageData(0, 0, width, height);

    let result = toGrayScale(imageData)

    return {
        "data": result,
        "width": width,
        "height": height
    }

    //console.log(result)
}


function toGrayScale(imageData) {
    const gray = new Uint8ClampedArray(imageData.width * imageData.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]

        gray[i] = Math.round((r + g + b) / 3 )
    }return gray
}








async function loadImage() {
    const res = await fetch("./assets/goldfish.png")

    if (!res.ok) {
        console.log("failed to load image")
        return
    }

    let blob = await res.blob()

    try {
        return await createImageBitmap(blob)
    } catch (e) {
        console.log("failed to convert image", e)

    }
}

