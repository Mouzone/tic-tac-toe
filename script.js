// Initialize game state
let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; // -1 for empty, 0 for O, 1 for X
let curr_player = 0; // 0 for O, 1 for X
let moves = 0;
let gameEnded = false;

// Function to generate the game board
function generateBoard() {
    const boardContainer = document.getElementById("board");
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;
            boardContainer.appendChild(square);
        }
    }
    makeSquaresInteractive();
}

// Function to handle click events on squares
function handleSquareClick(event) {
    const square = event.target;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    if (board[row][col] === -1 && !gameEnded) {
        board[row][col] = curr_player;
        updateSquare(square);
        moves++;
        const playerHasWon = checkWin();
        if (playerHasWon || moves === 9) {
            endTheGame(playerHasWon);
        } else {
            curr_player = 1 - curr_player; // Toggle player turn (0 to 1 or 1 to 0)
        }
    }
}

// Function to update square appearance based on current player
function updateSquare(square) {
    square.textContent = curr_player === 0 ? "O" : "X";
}

// Function to make squares interactive
function makeSquaresInteractive() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("click", handleSquareClick);
    });
}

// Function to remove event listeners from squares
function removeSquareListeners() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.removeEventListener("click", handleSquareClick);
    });
}

// Function to check if there is a winner
function checkWin() {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== -1 && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true; // Row i has a winner
        }
        if (board[0][i] !== -1 && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true; // Column i has a winner
        }
    }

    // Check diagonals
    if (board[0][0] !== -1 && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true; // Top-left to bottom-right diagonal has a winner
    }
    if (board[0][2] !== -1 && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true; // Top-right to bottom-left diagonal has a winner
    }

    return false; // No winner
}

// Function to end the game
function endTheGame(playerHasWon) {
    gameEnded = true;
    if (playerHasWon) {
        const winner = curr_player === 0 ? "O" : "X";
        console.log(`${winner} has won in ${moves} moves!`);
    } else {
        console.log("It's a tie!");
    }
    removeSquareListeners();
}

// Start the game
generateBoard();
