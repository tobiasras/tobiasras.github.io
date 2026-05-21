(function () {
    const container = document.querySelector(".project-card-game-of-life");
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "game-of-life__canvas";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const COLORS = {
        bg: "#100820",
        alive: "#ff22a3",
        grid: "rgba(255, 255, 255, 0.06)",
    };

    const CELL_SIZE = 32;
    const TICK_MS = reducedMotion ? 400 : 64;

    let cols = 0;
    let rows = 0;
    let displayWidth = 0;
    let displayHeight = 0;
    let grid = [];
    let nextGrid = [];
    let isDrawing = false;
    let tickTimer = null;

    function drawOnStartGrid(array) {
        array[3][5] = 1
        array[4][6] = 1
        array[5][6] = 1
        
        array[5][4] = 1
        array[4][4] = 1
        array[6][5] = 1


    }

    function createGrid() {
        const array = Array.from({ length: rows }, () => new Uint8Array(cols));
        drawOnStartGrid(array)
        return array
    }

    function resize() {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        displayWidth = width;
        displayHeight = height;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const prev = grid;
        const prevCols = cols;
        const prevRows = rows;

        cols = Math.max(1, Math.floor(width / CELL_SIZE));
        rows = Math.max(1, Math.floor(height / CELL_SIZE));

        grid = createGrid();
        nextGrid = createGrid();

        if (prev.length) {
            for (let y = 0; y < Math.min(rows, prevRows); y++) {
                for (let x = 0; x < Math.min(cols, prevCols); x++) {
                    grid[y][x] = prev[y][x];
                }
            }
        }

        render();
    }

    function cellFromEvent(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);
        return { x, y };
    }

    function setCellAlive(x, y) {
        if (x < 0 || y < 0 || x >= cols || y >= rows) return;
        grid[y][x] = 1;
    }

    function paintAt(event) {
        const { x, y } = cellFromEvent(event);
        setCellAlive(x, y);
        render();
    }

    function countNeighbors(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && grid[ny][nx]) {
                    count++;
                }
            }
        }
        return count;
    }

    function step() {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const neighbors = countNeighbors(x, y);
                const alive = grid[y][x];
                nextGrid[y][x] = alive
                    ? neighbors === 2 || neighbors === 3
                    : neighbors === 3;
            }
        }

        const temp = grid;
        grid = nextGrid;
        nextGrid = temp;
    }

    function render() {
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.fillStyle = COLORS.alive;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x]) {
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
                }
            }
        }
    }

    function tick() {
        step();
        render();
    }

    function startLoop() {
        if (tickTimer) return;
        tickTimer = window.setInterval(tick, TICK_MS);
    }

    canvas.addEventListener("pointerdown", (event) => {
        isDrawing = true;
        canvas.setPointerCapture(event.pointerId);
        paintAt(event);
    });

    canvas.addEventListener("pointermove", (event) => {
        if (!isDrawing) return;
        paintAt(event);
    });

    canvas.addEventListener("pointerup", () => {
        isDrawing = false;
    });

    canvas.addEventListener("pointercancel", () => {
        isDrawing = false;
    });

    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    startLoop();
})();
