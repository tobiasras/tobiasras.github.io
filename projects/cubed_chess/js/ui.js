export class UIController {
        constructor() {
            this.slideMenus = document.getElementById('slideMenu')
            this.menuToggles = document.getElementsByClassName("menu-toggle")
            this.playerTurn = document.getElementById("player-turn")
            this.sides = document.querySelectorAll('.side-canvas')

            this.setupMenuBtn()
            this.setupNav()
            this.setupStartGameBtn()

        }


        setNormalStartFunc(normalStartFunc){
            this.normalStartFunc = normalStartFunc
        }
        freeNormalStartFunc(freeStartFunc){
            this.freeNormalStartFunc = freeStartFunc
        }

    setupMenuBtn() {
            Array.from(this.menuToggles).forEach(menu => {
                menu.addEventListener('click', (e) => {
                    e.preventDefault();
                    slideMenu.classList.toggle('open');
                })
            })
        }


        setupStartGameBtn() {
            this.normalPlayBtn = document.getElementById("start-normal-play")

            this.normalPlayBtn.addEventListener("click", (event) => {
                this.startGame()

                this.normalStartFunc()
            })
            //this.freePlayBtn  = document.getElementById("start-free-play")
        }

        startGame() {
            this.togglePlayerCards()
        }

        togglePlayerCards() {
            this.playerTurn.hidden = !this.playerTurn.hidden
        }

        switchPlayerTurn() {
            const whitePiecesText = "White's turn"
            const blackPiecesText = "Black's turn"
            let currentText = this.playerTurn.innerText
            if (currentText === whitePiecesText) {
                this.playerTurn.innerText = blackPiecesText
            } else {
                this.playerTurn.innerText = whitePiecesText
            }
            this.playerTurn.classList.toggle('open');
        }

        
        /** setup the 6 canvases that is used to move the camera to diffrent faces of the board **/
        setupNav() {
            const sides = document.querySelectorAll('.side-canvas');
            const sidesArray = Array.from(sides);

            sidesArray.forEach(side => {
                // Get the computed dimensions of the canvas from CSS
                const rect = side.getBoundingClientRect();
                side.width = rect.width; // Set the canvas width
                side.height = rect.height; // Set the canvas height

                const ctx = side.getContext("2d");

                const dim = [side.width, side.height];

                const gridSize = 8;
                const cellSize = dim[0] / gridSize;
            });
        }

    }
    


