function visitNeighbors(image, startPos) {
    const height = image.length;
    const width = image[0].length;
    const x = startPos.x;
    const y = startPos.y;

    // Define the 8 directions (dx, dy)
    const directions = [
        [1, 0],   // right
        [1, -1],  // down-right
        [0, -1],  // down
        [-1, -1], // down-left
        [-1, 0],  // left
        [-1, 1],  // up-left
        [0, 1],   // up
        [1, 1]    // up-right
    ];

    const neighbors = [];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        // Bounds check
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            neighbors.push(image[ny][nx]);
        } else {
            neighbors.push(null); // or 0, or skip, depending on your use case
        }
    }

    return neighbors;
}

function createChainedEncoding(grayScale, width) {
    let result = []

    let chains = 0


    let image = convertArrayTo2d(grayScale, width)


    //visitNeighbors(image, [0, 0])

    let visited = new Set()

    for (let x = 0; x < image.length; x++) {
        for (let y = 0; y < image[x].length; y++) {
            if (visited.has({x,y})) continue

            let pixelValue = image[x][y]

            if (127 < pixelValue) {
                // pixel is bright:

                visitNeighbors(image, {x,y})
            }
            visited.add({x,y})
        }
    }














}

export async function processImage() {
    const imageBitMap = await loadImage()
    if (imageBitMap === undefined) return

    let width = imageBitMap.width
    let height = imageBitMap.height

    const offscreen = new OffscreenCanvas(imageBitMap.width, imageBitMap.height)
    const ctx = offscreen.getContext("2d")

    ctx.drawImage(imageBitMap, 0, 0)

    const imageData = ctx.getImageData(0, 0, width, height);
    let grayScale = toGrayScale(imageData, width, height) // width and height is the images pixel height and width!!

    console.log(grayScale)

    let result = createChainedEncoding(grayScale, width)

    console.log(result)

    return {
        "data": grayScale,
        "width": width,
        "height": height
    }

    //console.log(result)


}



function convertArrayTo2d(array, width) {
    const list = [[]]

    let y = 0
    let count = 0
    let x = 0

    while (count !== array.length) {
        if (x === width) {
            x = 0
            y += 1
            list.push([])
        }
        list[y].push(array[count])

        x += 1
        count += 1
    }

    return list

}

function toGrayScale(imageData) {
    const gray = new Uint8ClampedArray(imageData.width * imageData.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]

        gray[i] = Math.round((r + g + b) / 3)
    }
    return gray
}


async function loadImage() {
    const res = await fetch("./assets/invert.png")

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

