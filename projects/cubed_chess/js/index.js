import {createBoard} from "./chessboard.js";
import {animateLoop, scene, retrieveTileOnClick} from "./threeSettings.js";
import {UIController} from "./ui.js";
import {
    checkCheckmate,
    getGameBoardTileFromTile, movePiece, removeAllHighlights,
    setupPieces, showPossibleMoves,
} from "./gamecontroller.js";


export let gameBoard = {}

let whiteKing
let blackKing


function startGame() {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    gameBoard = createBoard(scene)
    let kings = setupPieces()
    currentPlayerTurn = 'w'
    gameHasStarted = true

    whiteKing = kings.whiteKing
    blackKing = kings.blackKing
}

gameBoard = createBoard(scene)


let currentPlayerTurn;
let selectedPiece
let hasHighlighted = false
let possibleMoves = new Set();
let gameHasStarted = false

document.onmousedown = (event) => {
    if (event.button !== 0)
        return

    const tileModel = retrieveTileOnClick(event)
    if (!tileModel)
        return;


    const tileString = tileModel.object.name

    if (!hasHighlighted) {
        const tileGameObject = getGameBoardTileFromTile(tileModel.object.name)
        possibleMoves = showPossibleMoves(tileGameObject.tile)

        if (!possibleMoves)
            return
        selectedPiece = tileGameObject
        hasHighlighted = true

        return
    }


    let pieceToMove = false
    let destination

    possibleMoves.forEach((highlightedTiles) => {
        if (highlightedTiles.tile === tileString) {
            destination = highlightedTiles.tile
            pieceToMove = true;
        }
    })

    // player pressed outside of possible moves, we there remove all highlighedted moves
    if (!pieceToMove) {
        removeAllHighlights([...possibleMoves])
        selectedPiece = {}
        hasHighlighted = false
        possibleMoves = new Set();
        return;
    }


    // move logic

    if (gameHasStarted && selectedPiece.piece.type[0] !== currentPlayerTurn) {
        return;
    }

    movePiece(selectedPiece.tile, destination)
    removeAllHighlights([...possibleMoves])


    let kingTile = (currentPlayerTurn === 'w') ? whiteKing : blackKing

    let isInCheck = checkCheckmate(currentPlayerTurn === 'w' ? 'b' : 'w', {
        tile: kingTile,
        piece: {
            type: currentPlayerTurn
        }
    })
    console.log("is in check", isInCheck)


    selectedPiece = {}
    hasHighlighted = false
    possibleMoves = new Set();


    if (currentPlayerTurn === 'w') {
        currentPlayerTurn = 'b';
    } else {
        currentPlayerTurn = 'w';

    }


}


const ui = new UIController()
ui.setNormalStartFunc(startGame)


//removeAllHighlights([...possibleMoves])


animateLoop()






