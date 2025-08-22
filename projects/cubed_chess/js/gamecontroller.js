import * as THREE from 'three';
import {gameBoard} from "./index.js";
import {scene} from "./threeSettings.js";

const textureLoader = new THREE.TextureLoader();

const textures = {
    "bB": textureLoader.load('./assets/chess_pieces/tatiana/bB.svg'),
    "bK": textureLoader.load('./assets/chess_pieces/tatiana/bK.svg'),
    "bN": textureLoader.load('./assets/chess_pieces/tatiana/bN.svg'),
    "bP": textureLoader.load('./assets/chess_pieces/tatiana/bP.svg'),
    "bQ": textureLoader.load('./assets/chess_pieces/tatiana/bQ.svg'),
    "bR": textureLoader.load('./assets/chess_pieces/tatiana/bR.svg'),
    "wB": textureLoader.load('./assets/chess_pieces/tatiana/wB.svg'),
    "wK": textureLoader.load('./assets/chess_pieces/tatiana/wK.svg'),
    "wN": textureLoader.load('./assets/chess_pieces/tatiana/wN.svg'),
    "wP": textureLoader.load('./assets/chess_pieces/tatiana/wP.svg'),
    "wQ": textureLoader.load('./assets/chess_pieces/tatiana/wQ.svg'),
    "wR": textureLoader.load('./assets/chess_pieces/tatiana/wR.svg'),
    "highlight_1": textureLoader.load('./assets/highlights/highlight_1.svg')
}

export function displayPiece(tile, type, isFlipped) {
    // view
    let model = scene.getObjectByName(`$:${tile}`)
    let texture = textures[type]
    
    texture.colorSpace = THREE.SRGBColorSpace
    model.material.map = texture
    model.material.transparent = true
    model.material.flipY = isFlipped;
    model.material.blending = 1
}

export function clearTile(tileName) {
    let tile = scene.getObjectByName(`$:${tileName}`)
    tile.material.transparent = false
    delete tile.material.map
}

export function createPiece(tile, type, isFlipped) {
    // gameBoard
    let gameBoardTile = getGameBoardTileFromTile(tile);

    gameBoardTile.hasPiece = true
    gameBoardTile.piece = {
        type: type,
        moves: 0
    }
    displayPiece(tile, type, isFlipped);
}

export function movePiece(fromTile, toTile) {
    const from = getGameBoardTileFromTile(fromTile)
    const to = getGameBoardTileFromTile(toTile)

    to.piece = from.piece
    to.hasPiece = true
    to.piece.moves += 1

    from.piece = {}
    from.hasPiece = false

    displayPiece(toTile, to.piece.type, true);
    clearTile(fromTile)
}

export function setupPieces() {
    createPiece('1_3_5', "wP", false)
    createPiece('1_3_7', "wP", false)
    createPiece('1_3_4', "wP", false)
    createPiece('1_3_2', "wP", false)
    createPiece('1_3_1', "wP", false)
    createPiece('1_3_8', "wP", false)
    createPiece('1_3_3', "wP", false)
    createPiece('1_3_6', "wP", false)

    createPiece('1_4_5', "wK", false)
    createPiece('1_4_7', "wN", false)
    createPiece('1_4_2', "wN", false)
    createPiece('1_4_1', "wR", false)
    createPiece('1_4_8', "wR", false)
    createPiece('1_4_3', "wB", false)
    createPiece('1_4_6', "wB", false)

    createPiece('1_5_7', "wN", false)
    createPiece('1_5_4', "wQ", false)
    createPiece('1_5_2', "wN", false)
    createPiece('1_5_1', "wR", false)
    createPiece('1_5_8', "wR", false)
    createPiece('1_5_3', "wB", false)
    createPiece('1_5_6', "wB", false)

    createPiece('1_6_5', "wP", false)
    createPiece('1_6_7', "wP", false)
    createPiece('1_6_4', "wP", false)
    createPiece('1_6_2', "wP", false)
    createPiece('1_6_1', "wP", false)
    createPiece('1_6_8', "wP", false)
    createPiece('1_6_3', "wP", false)
    createPiece('1_6_6', "wP", false)

    createPiece('3_3_8', "wP", false)
    createPiece('3_4_8', "wP", false)
    createPiece('3_5_8', "wP", false)
    createPiece('3_6_8', "wP", false)

    createPiece('4_3_8', "wP", false)
    createPiece('4_4_8', "wP", false)
    createPiece('4_5_8', "wP", false)
    createPiece('4_6_8', "wP", false)

    createPiece('3_3_1', "bP", false)
    createPiece('3_4_1', "bP", false)
    createPiece('3_5_1', "bP", false)
    createPiece('3_6_1', "bP", false)

    createPiece('4_3_1', "bP", false)
    createPiece('4_4_1', "bP", false)
    createPiece('4_5_1', "bP", false)
    createPiece('4_6_1', "bP", false)

    createPiece('6_6_5', "bP", false)
    createPiece('6_6_7', "bP", false)
    createPiece('6_6_4', "bP", false)
    createPiece('6_6_2', "bP", false)
    createPiece('6_6_1', "bP", false)
    createPiece('6_6_8', "bP", false)
    createPiece('6_6_3', "bP", false)
    createPiece('6_6_6', "bP", false)


    createPiece('6_4_5', "bK", false)
    createPiece('6_4_7', "bN", false)
    createPiece('6_4_2', "bN", false)
    createPiece('6_4_1', "bR", false)
    createPiece('6_4_8', "bR", false)
    createPiece('6_4_3', "bB", false)
    createPiece('6_4_6', "bB", false)

    createPiece('6_5_7', "bN", false)
    createPiece('6_5_4', "bQ", false)
    createPiece('6_5_2', "bN", false)
    createPiece('6_5_1', "bR", false)
    createPiece('6_5_8', "bR", false)
    createPiece('6_5_3', "bB", false)
    createPiece('6_5_6', "bB", false)

    createPiece('6_3_5', "bP", false)
    createPiece('6_3_7', "bP", false)
    createPiece('6_3_4', "bP", false)
    createPiece('6_3_2', "bP", false)
    createPiece('6_3_1', "bP", false)
    createPiece('6_3_8', "bP", false)
    createPiece('6_3_3', "bP", false)
    createPiece('6_3_6', "bP", false)

    return {
        blackKing: '6_4_5',
        whiteKing: '1_4_5'
    }
}

export function getGameBoardTileFromTile(tile) {
    const pos = tile.split("_");
    return gameBoard[+pos[0] - 1][+pos[1]][+pos[2]]
}

function transformDirectionDiagonal(pos, nextPos, direction) {
    if (pos[0] === 1) {
        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 3) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 4) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
    } else if (pos[0] === 2) {
        if (nextPos[0] === 1) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }


    } else if (pos[0] === 3) {
        if (nextPos[0] === 1) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
    } else if (pos[0] === 4) {
        if (nextPos[0] === 1) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
    } else if (pos[0] === 5) {
        if (nextPos[0] === 1) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            }
        }
    } else if (pos[0] === 6) {
        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
    }


}

function transformDirectionStraight(direction, pos, nextPos) {
    if (direction[0] === 0 || direction[1] === 0) {
        if (pos[0] === 1) {
            if (nextPos[0] === 2) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 3) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 4) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 5) {
                direction[0] = 0
                direction[1] = -1
            }
        } else if (pos[0] === 2) {
            if (nextPos[0] === 1) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 3) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 4) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 6) {
                direction[0] = -1
                direction[1] = 0
            }
        } else if (pos[0] === 3) {
            if (nextPos[0] === 1) {
                direction[0] = 0
                direction[1] = -1

            } else if (nextPos[0] === 2) {
                direction[0] = -1
                direction[1] = 0

            } else if (nextPos[0] === 5) {
                direction[0] = -1
                direction[1] = 0

            } else if (nextPos[0] === 6) {
                direction[0] = 0
                direction[1] = -1
            }
        } else if (pos[0] === 4) {
            if (nextPos[0] === 1) {
                direction[0] = 0
                direction[1] = 1

            } else if (nextPos[0] === 2) {
                direction[0] = 1
                direction[1] = 0

            } else if (nextPos[0] === 5) {
                direction[0] = 1
                direction[1] = 0

            } else if (nextPos[0] === 6) {
                direction[0] = 0
                direction[1] = 1
            }
        }

        if (pos[0] === 5) {
            if (nextPos[0] === 1) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 3) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 4) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 6) {
                direction[0] = 1
                direction[1] = 0
            }
        }

        if (pos[0] === 6) {
            if (nextPos[0] === 2) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 3) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 4) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 5) {
                direction[0] = 0
                direction[1] = 1
            }
        }
    }
}

function transformDirection(direction, nextPos, pos) {
    transformDirectionDiagonal(pos, nextPos, direction);
    transformDirectionStraight(direction, pos, nextPos);
}

function crawlStraight(possibleTiles, pos, direction, pieceColor, canAttack, depth = 999) {
    if (depth === 0)
        return;


    const side = pos[0] - 1 // sides are from 1, 2, 3, 4, 5. -1 for
    const xPos = pos[1] + direction[0]
    const yPos = pos[2] + direction[1]

    let nextGameTile = gameBoard[side][xPos][yPos]
    if (nextGameTile === 0) {
        return;
    }

    let checkForPieces = nextGameTile

    if (!nextGameTile.isBoardTile) {
        checkForPieces = getGameBoardTileFromTile(nextGameTile.tile)
    }

    const nextPos = checkForPieces.tile.split("_").map(val => +val)

    // check for pieces
    if (checkForPieces.hasPiece) {
        if (checkForPieces.piece.type[0] !== pieceColor && canAttack) {
            // color not the same and can attack

            possibleTiles.add(checkForPieces)
            return
        } else {
            // cannot move here cause same piece color
            return
        }
    }

    // no piece on tile
    if (nextGameTile.isBoardTile) {
        possibleTiles.add(nextGameTile)
        depth = depth - 1;
        crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack, depth)
        return
    }

    possibleTiles.add(checkForPieces)
    // makes it possible to travel to diff. sides
    transformDirection(direction, nextPos, pos);

    depth = depth - 1;
    crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack, depth)
}

function nextTile(position, direction) {
    const side = position[0] - 1 // sides are from 1, 2, 3, 4, 5. -1 for
    const xPos = position[1] + direction[0]
    const yPos = position[2] + direction[1]
    return gameBoard[side][xPos][yPos]
}

function crawlKnight(possibleTiles, pos, direction, pieceColor, canAttack) {
    // one tile
    let next = nextTile(pos, direction);
    let nextPos = next.tile.split("_").map(val => +val)

    if (!next.isBoardTile) {
        transformDirection(direction, nextPos, pos);
    }

    next = nextTile(nextPos, direction)
    nextPos = next.tile.split("_").map(val => +val)

    if (!next.isBoardTile) {
        transformDirection(direction, nextPos, pos);
    }

    direction.reverse()
    let sides = direction.map(val => val * -1)


    for (let i = 0; i < 2; i++) {
        sides = sides.map(val => val * -1)
        let next = nextTile(nextPos, sides);
        if (!next.isBoardTile) {
            next = getGameBoardTileFromTile(next.tile)
        }

        if (next.hasPiece) {
            if (next.piece.type[0] !== pieceColor && canAttack) {
                // color not the same and can attack
                possibleTiles.add(next)
            }
        } else {
            possibleTiles.add(next)
        }

    }
}

function crawlSingle(possibleTiles, pos, direction, pieceColor, canAttack, canMoveWithoutAttacking = true) {
    let next = nextTile(pos, direction);

    if (!next.isBoardTile) {
        next = getGameBoardTileFromTile(next.tile)
    }

    if (next.hasPiece) {
        if (next.piece.type[0] !== pieceColor && canAttack) {
            // color not the same and can attack
            possibleTiles.add(next)
        }
    } else {
        if (canMoveWithoutAttacking) {
            possibleTiles.add(next)
        }
    }
}



function singleStraight(gameBoardTile, canAttack) {
    let possibleTiles = new Set();
    let pieceColor = gameBoardTile.piece.type[0]
    const pos = gameBoardTile.tile.split("_").map(val => +val)
    crawlSingle(possibleTiles, pos, [-1, 0], pieceColor, canAttack) // left
    crawlSingle(possibleTiles, pos, [1, 0], pieceColor, canAttack)  // right
    crawlSingle(possibleTiles, pos, [0, 1], pieceColor, canAttack)  // up
    crawlSingle(possibleTiles, pos, [0, -1], pieceColor, canAttack) // down
    return possibleTiles
}



function singleMove(gameBoardTile, canAttack) {

    let possibleTiles = new Set();

    let pieceColor = gameBoardTile.piece.type[0]

    const pos = gameBoardTile.tile.split("_").map(val => +val)

    crawlSingle(possibleTiles, pos, [-1, 0], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [-1, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [-1, 1], pieceColor, canAttack)

    crawlSingle(possibleTiles, pos, [1, 1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [1, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [1, 0], pieceColor, canAttack)

    crawlSingle(possibleTiles, pos, [0, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [0, 1], pieceColor, canAttack)

    return possibleTiles
}


function diagonalSingleAttack(gameBoardTile) {
    let possibleTiles = new Set();
    let pieceColor = gameBoardTile.piece.type[0]
    const pos = gameBoardTile.tile.split("_").map(val => +val)

    crawlSingle(possibleTiles, pos, [-1, -1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [1, 1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [-1, 1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [1, -1], pieceColor, true, false)

    return possibleTiles
}

const typeMoves = {
    "cross": (startTile) => {
        const pos = startTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [0, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 0], pieceColor, true)

        return possibleTiles
    },
    "diagonal": (startTile) => {

        const pos = startTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [-1, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, -1], pieceColor, true)

        return possibleTiles
    },
    "knight": (startTile) => {
        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        const pos = startTile.tile.split("_").map(val => +val)
        crawlKnight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [-1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, -1], pieceColor, true)

        return possibleTiles
    },
    "single": (startTile) => {
        return singleMove(startTile, false);
    },
    "singleStraight": (startTile) => {
        return singleStraight(startTile, false)
    },
    "singleAttack": (startTile) => {
        return singleMove(startTile, true);
    },
    "diagonalAttack": (startTile) => {
        return diagonalSingleAttack(startTile)
    },
    "doubleStart": (startTile) => {
        let possibleTiles = new Set();

        if (0 < startTile.piece.moves)
            return possibleTiles

        let pieceColor = startTile.piece.type[0]
        const pos = startTile.tile.split("_").map(val => +val)

        crawlStraight(possibleTiles, pos, [0, 1], pieceColor, true, 2)
        crawlStraight(possibleTiles, pos, [0, -1], pieceColor, true, 2)
        crawlStraight(possibleTiles, pos, [1, 0], pieceColor, true, 2)
        crawlStraight(possibleTiles, pos, [-1, 0], pieceColor, true, 2)

        return possibleTiles
    }

}

const pieceMoveInstructions = {
    "b": [
        typeMoves.diagonal
    ],
    "k": [
        typeMoves.singleAttack,
    ],
    "n": [
        typeMoves.knight
    ],
    "p": [
        typeMoves.singleStraight,
        typeMoves.diagonalAttack,
        typeMoves.doubleStart
    ],
    "q": [
        typeMoves.cross,
        typeMoves.diagonal
    ],
    "r": [
        typeMoves.cross
    ]
}

export function showPossibleMoves(tile) {
    const gameBoardTile = getGameBoardTileFromTile(tile)

    if (!gameBoardTile.hasPiece)
        return

    const pieceTypeNoColor = gameBoardTile.piece.type[1].toLowerCase() // b, k, n, p, q, r
    const moves = pieceMoveInstructions[pieceTypeNoColor]

    let allPossibleMoves = new Set();
    // move returns Sets.
    moves.forEach(move => {
        const possibleMoves = move(gameBoardTile)
        allPossibleMoves = new Set([...allPossibleMoves, ...possibleMoves])
    })

    allPossibleMoves.forEach(value => {
        displayHighlight(value.tile)
    })


    return allPossibleMoves
}


export function removeAllHighlights(highlightList) {
    highlightList.forEach(gameTile => {
        removeHighlight(gameTile.tile)
    })
}

function removeHighlight(tile) {
    const tileModel = scene.getObjectByName(`$:${tile}`)
    const gameTile = getGameBoardTileFromTile(tile)
    if (gameTile.hasPiece) {
        tileModel.material.color = {
            r: 1,
            g: 1,
            b: 1,
            isColor: true
        }
    } else {
        tileModel.material.map = null
        tileModel.material.transparent = false
    }
}

function displayHighlight(tile) {
    const model = scene.getObjectByName(`$:${tile}`)
    const gameBoardTile = getGameBoardTileFromTile(tile);
    if (gameBoardTile.hasPiece) {
        let pieceType = gameBoardTile.piece.type
        if (pieceType[0] === 'b') {
            model.material.color = {
                r: "4",
                g: "9",
                b: "1.1",
                isColor: true
            }
        } else {
            model.material.color = {
                r: "0.4",
                g: "1",
                b: "0.1",
                isColor: true
            }
        }
    } else {
        let texture = textures["highlight_1"]
        texture.colorSpace = THREE.SRGBColorSpace
        model.material.map = texture
        model.material.transparent = true
        model.material.blending = 1
        model.material.color = {
            r: "4",
            g: "9",
            b: "1.1",
            isColor: true
        }
    }
}

export function checkCheckmate(pieceColor, gameBoardKingTile) {
    console.log("is checking checkmate for , ", pieceColor , " king is on ," , gameBoardKingTile)

    console.log(gameBoardKingTile)

    let isInCheck = false

    typeMoves.cross(gameBoardKingTile).forEach(tile => {
        if (tile.hasPiece) {
            let piTy = tile.piece.type[1]
            if (piTy === 'Q' || piTy === 'R') {
                isInCheck = true
            }
        }

    });

    typeMoves.diagonal(gameBoardKingTile).forEach(tile => {
        if (tile.hasPiece) {
            let piTy = tile.piece.type[1]
            if (piTy === 'Q' || piTy === 'B') {
                isInCheck = true
            }
        }
    })

    typeMoves.knight(gameBoardKingTile).forEach(tile => {
        if (tile.hasPiece) {
            let piTy = tile.piece.type[1]
            if (piTy === 'N') {
                isInCheck = true
            }
        }
    })

    return isInCheck
}