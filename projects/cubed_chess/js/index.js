import {createBoard} from "./chessboard.js";
import {animateLoop, scene, retrieveTileOnClick} from "./threeSettings.js";

import {
    checkCheckmate,
    getGameBoardTileFromTile, movePiece, removeAllHighlights,
    setupPieces, showPossibleMoves,
} from "./gamecontroller.js";


const startBtn = document.getElementById("start-btn")
const playerView = document.getElementById("player-view")
const whitePiecesHeader = document.getElementById("white-pieces")
const blackPiecesHeader = document.getElementById("black-pieces")

playerView.style.display = "none"
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none"
    playerView.style.display = "flex"

    whitePiecesHeader.style.fontWeight = 'bold';
    whitePiecesHeader.style.textDecoration = 'underline';
    blackPiecesHeader.style.color = '#ffffff';
    whitePiecesHeader.style.color = '#61ff61';
    blackPiecesHeader.style.textDecoration = ''; // Reset style for blackPiecesHeader
    blackPiecesHeader.style.fontWeight = '';

    removeAllHighlights([...possibleMoves])
    startGame()
})




export let gameBoard = {}



let whiteKing
let blackKing

let currentPlayerTurn;
let selectedPiece
let hasHighlighted = false
let possibleMoves = new Set();
let gameHasStarted = false

function startGame() {
    while(scene.children.length > 0){
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

document.onmousedown = (event) => {
    if (event.button !== 0)
        return

    const tileModel = retrieveTileOnClick(event)

    if (!tileModel)
        return;

    const tileString = tileModel.object.name

    document.getElementById("lastTile").innerText = tileString

    if (hasHighlighted) {
        let pieceToMove = false
        let destination


        possibleMoves.forEach((highlightedTiles) => {
            if (highlightedTiles.tile === tileString) {
                destination = highlightedTiles.tile
                pieceToMove = true;
            }
        })

        if (!pieceToMove) {
            removeAllHighlights([...possibleMoves])
            selectedPiece = {}
            hasHighlighted = false
            possibleMoves = new Set();
        } else {
            if (gameHasStarted && selectedPiece.piece.type[0] !== currentPlayerTurn) {
                return;
            }

            movePiece(selectedPiece.tile, destination)
            removeAllHighlights([...possibleMoves])

            console.log(selectedPiece)

            if (gameHasStarted) {
                let kingTile = (currentPlayerTurn === 'w') ? whiteKing : blackKing
                let isInCheck = checkCheckmate(currentPlayerTurn === 'w' ? 'b' : 'w', {
                    tile: kingTile,
                    piece: {
                        type : currentPlayerTurn
                    }
                })


                console.log("is in check", isInCheck)
            }



            selectedPiece = {}
            hasHighlighted = false
            possibleMoves = new Set();

            if (currentPlayerTurn === 'w') {
                currentPlayerTurn = 'b';
                blackPiecesHeader.style.textDecoration = 'underline';
                blackPiecesHeader.style.fontWeight = 'bold';
                whitePiecesHeader.style.color = '#ffffff';
                blackPiecesHeader.style.color = '#61ff61';
                whitePiecesHeader.style.textDecoration = ''; // Reset style for whitePiecesHeader
                whitePiecesHeader.style.fontWeight = ''; // Reset style for whitePiecesHeader
            } else {
                currentPlayerTurn = 'w';
                whitePiecesHeader.style.textDecoration = 'underline';
                whitePiecesHeader.style.fontWeight = 'bold';
                blackPiecesHeader.style.color = '#ffffff';
                whitePiecesHeader.style.color = '#61ff61';
                blackPiecesHeader.style.textDecoration = ''; // Reset style for blackPiecesHeader
                blackPiecesHeader.style.fontWeight = '';
            }
            return;
        }
    }



    const tileGameObject = getGameBoardTileFromTile(tileModel.object.name)
    possibleMoves = showPossibleMoves(tileGameObject.tile)

    if (!possibleMoves)
        return;

    selectedPiece = tileGameObject
    hasHighlighted = true



}










animateLoop()






