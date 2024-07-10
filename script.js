// move is in 8, X or 1, O format
function parseMove(move, board) {
    const move_parts = move.split(",")
    const position = move_parts[0]
    const piece = move_parts[1]
    if (!board[Math.floor(position/9)][position%9]) {
        board[Math.floor(position/9)][position%9] = piece
        return true
    } else{
        return false
    }
}

function checkWin(board){
    // check each row
    board.forEach(row => {
        if (row[1] === row[0] && row[1] === row[2]){
            return row[0]
        }
    })

    // check each col
    for (let col = 0; col < 3; col++){
        if (board[1][col] === board[0][col] && board[col][1] === board[2][col]) {
            return board[1][col]
        }
    }

    // check the 2 diagonals
    if ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
        (board[0][2] === board[1][1] && board[2][2] === board[2][0])) {
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
    const board = [[null, null, null], [null, null, null], [null, null, null]]
    let game_over = false
    let moves = 0
    let outcome = null

    while (!game_over && moves < 9) {
        let move = prompt("Enter Move")
        while (!parseMove(move, board)){
            move = prompt("Enter Move")
            parseMove(move)
        }

        const outcome = checkWin(board)
        if (outcome) {
            game_over = true
        }

        moves++
    }
    printGameEnd(outcome moves)
}

runGameEngine()
