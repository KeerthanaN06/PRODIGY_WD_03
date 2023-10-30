let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let xScore = 0;
let oScore = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const playerXScore = document.getElementById('playerX');
const playerOScore = document.getElementById('playerO');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const index = cell.id.split('-')[1];
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            gameOver = true;
            updateScore(currentPlayer);
            turnDisplay.innerText = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            gameOver = true;
            turnDisplay.innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.innerText = `Player ${currentPlayer}'s turn`;
        }
    }

    // Check if the game is over and reset the event listeners for new round
    if (gameOver) {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === player;
        });
    });
}

function checkDraw() {
    return board.every(cell => {
        return cell !== '';
    });
}

function updateScore(player) {
    if (player === 'X') {
        xScore++;
        playerXScore.innerText = `Player X: ${xScore}`;
    } else {
        oScore++;
        playerOScore.innerText = `Player O: ${oScore}`;
    }
}

function restart() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    turnDisplay.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

// Call restart() to initialize the game
restart();
