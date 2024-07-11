function generateBoard() {
    const board = document.querySelector("#board")
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            const square = document.createElement("div")
            board.appendChild(square)
            square.classList.add("square")
            square.dataset.row = `${row}`
            square.dataset.col = `${col}`
        }
    }
    makeSquaresInteractive()
}

function makeSquaresInteractive() {
    const squares = document.querySelectorAll(".square")
    squares.forEach(square => {
        square.addEventListener("click", event => {
            if (!square.textContent) {
                if (curr_player) {
                    square.textContent = "X"
                } else {
                    square.textContent = "O"
                }
                updateGame(square)
            }
        })
    })
}

function updateGame(square) {
    board[square.dataset.row][square.dataset.col] = curr_player
    moves++
    const player_has_won = checkWin()
    if (player_has_won || moves === 9) {
        endTheGame(player_has_won)
    } else {
        curr_player = (curr_player+1) % 2
    }
}

function checkWin(){
    console.log(board)
    // check each row
    board.forEach(row => {
        if (row[1] !== -1 && row[1] === row[0] && row[1] === row[2]){
            return true
        }
    })

    // check each col
    for (let col = 0; col < 3; col++){
        if (board[1][col] !== -1 && board[1][col] === board[0][col] && board[1][col] === board[2][col]) {
            return true
        }
    }

    // check the 2 diagonals
    return (board[1][1] !== -1) &&
        ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
}

function endTheGame(game_over){
    // remove eventListeners for Squares
    if (game_over) {
        if (curr_player) {
            console.log(`X has won in ${moves} moves`)
        } else {
            console.log(`O has won in ${moves} moves`)
        }
    } else {
        console.log("Tie!")
    }
}

const board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
let curr_player = 0 // 0 for O and 1 for X
let moves = 0
generateBoard()
