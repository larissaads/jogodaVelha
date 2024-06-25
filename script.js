document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

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

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.getAttribute('data-cell'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `O jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            status.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `É a vez do jogador ${currentPlayer}`;
    };

    const checkWin = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const handleRestart = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `É a vez do jogador ${currentPlayer}`;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    };

    board.addEventListener('click', handleCellClick);
    restartButton.addEventListener('click', handleRestart);
});
