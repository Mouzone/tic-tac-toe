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
}

// move is in 8,X or 1,O format
function parseMove(move, board) {
    const move_parts = move.split(" ")
    const position = parseInt(move_parts[0])
    const piece = move_parts[1]
    if (board[Math.floor(position/3)][position%3] === -1) {
        board[Math.floor(position/3)][position%3] = piece
        return true
    } else{
        return false
    }
}

function checkWin(board){
    // check each row
    board.forEach(row => {
        if (row[1] !== -1 && row[1] === row[0] && row[1] === row[2]){
            return row[0]
        }
    })

    // check each col
    for (let col = 0; col < 3; col++){
        if (board[1][col] !== -1 && board[1][col] === board[0][col] && board[1][col] === board[2][col]) {
            return board[1][col]
        }
    }

    // check the 2 diagonals
    if ((board[1][1] !== -1) &&
        ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0]))) {
        return board[1][1]
    }

    return null
}

function printGameEnd(outcome, moves) {
    if (outcome) {
        console.log(`${outcome.toUpperCase()} has won in ${moves} moves!`)
    } else {
        console.log("Tie!")
    }
}

function runGameEngine(){
    const board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
    let game_over = false
    let moves = 0
    let outcome = null

    generateBoard()
    while (!game_over && moves < 9) {
        let move = prompt("Enter Move")
        while (!parseMove(move, board)){
            move = prompt("Enter Move")
            parseMove(move, board)
        }

        outcome = checkWin(board)
        if (outcome) {
            game_over = true
        }

        moves++
    }
    printGameEnd(outcome, moves)
}

runGameEngine()
