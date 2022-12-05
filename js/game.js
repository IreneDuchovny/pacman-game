'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPERFOOD= '¥'
const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gInterval
var gFoodCount= 60

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gInterval = setInterval(cherryAdd, 15000);
    gGame.isOn = true
    var elModalGameOver = document.getElementById("myModal");
    elModalGameOver.style.display = 'none'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

        }
    }
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score


}

function foodCount() {
    // var count = 0
    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard.length; j++) {

    //         var cell = gBoard[i][j]

    //         if (cell === FOOD || cell === SUPERFOOD ||cell === GHOST) {
    //             count++
    //         }
    //     }
    // }

    return gFoodCount
}

function cherryAdd() {
    if (gFoodCount === 60 || gFoodCount === 0) {
        return
    }
    var randomI = getRandomInt(0, gBoard.length)
    var randomJ = getRandomInt(0, gBoard[0].length)

    if (gBoard[randomI][randomJ] === EMPTY ) {
        //DOM
        renderCell({ i: randomI, j: randomJ }, CHERRY)
        //MODEL
        gBoard[randomI][randomJ] = CHERRY
       gFoodCount++
        // gOcupiedCount++
    } else {
        cherryAdd()
    }
}



function gameWin() {
    console.log('Game WIN')
    clearInterval(gIntervalGhosts)
    clearInterval(gInterval)
    gGame.isOn = false
    modalMessage(true)
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gInterval)
    gGame.isOn = false
    modalMessage(false)
    renderCell(gPacman.location, '🪦')
}

//DONE: game over modal (1: game over text. 2: win text)
//DONE: on the modal: play again button (go to onInit())
function modalMessage(isWon) {

    var elModalGameOver = document.getElementById("myModal");
    var elGameOverMsg = document.querySelector(".modal span")
    elModalGameOver.style.display = 'block'
    // elGameOverMsg.innerText= 'GAME OVER'
    if (!isWon) {
        elGameOverMsg.innerText = "Game over"
    } else {
        elGameOverMsg.innerText = "victorious"
    }



}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
