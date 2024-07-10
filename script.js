// move is in 8, x or 1, o format
function parseMove(move) {
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

function checkWin(){
    // check each row
    board.forEach(row => {
        if (row[1] === row[0] && row[1] === row[2]){
            return true
        }
    })

    // check each col
    for (let col = 0; col < 3; col++){
        if (board[col][1] === board[col][0] && board[col][1] === board[col][2]) {
            return true
        }
    }

    // check the 2 diagonals
    return ((board[0][0] === board[1][1] && board[2][2] === board[1][1]) ||
        (board[0][2] === board[1][1] && board[2][2] === board[2][0]))

}

const board = [[null, null, null], [null, null, null], [null, null, null]]
let game_over = false
let moves_left = 9
while (!game_over && moves_left > 0) {
    let move = prompt("Enter Move")
    while (!parseMove(move)){
        move = prompt("Enter Move")
        parseMove(move)
    }
    game_over = checkWin()
    moves_left--
}
