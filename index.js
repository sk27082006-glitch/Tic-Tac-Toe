// ====== GAME STATE ======
let gameId = null;
let playerId = null;
let playerSymbol = null; // 'X' or 'O'
let isMyTurn = false;
let gameActive = false;

// ====== DOM ELEMENTS ======
const gameMenu = document.getElementById('gameMenu');
const gameBoard = document.getElementById('gameBoard');
const createGameBtn = document.getElementById('createGameBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const gameCodeInput = document.getElementById('gameCodeInput');
const playerStatusEl = document.getElementById('playerStatus');
const turnStatusEl = document.getElementById('turnStatus');
const gameCodeEl = document.getElementById('gameCode');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const restartBtn = document.getElementById('restartBtn');
const resultEl = document.getElementById('result');

// Board buttons
const buttons = {};
for (let i = 1; i <= 9; i++) {
    buttons['b' + i] = document.getElementById('b' + i);
}

// ====== INITIALIZE ======
document.addEventListener('DOMContentLoaded', () => {
    createGameBtn.addEventListener('click', createNewGame);
    joinGameBtn.addEventListener('click', () => {
        if (gameCodeInput.value.trim()) {
            joinGame(gameCodeInput.value.trim());
        }
    });

    copyLinkBtn.addEventListener('click', copyInviteLink);
    restartBtn.addEventListener('click', restartGame);

    for (let i = 1; i <= 9; i++) {
        buttons['b' + i].addEventListener('click', () => makeMove(i - 1));
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('game')) {
        gameCodeInput.value = params.get('game');
    }
});

// ====== CREATE GAME ======
async function createNewGame() {
    playerId = 'player_' + Date.now();
    gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
    playerSymbol = 'X';

    const gameData = {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        players: { X: playerId, O: null },
        status: 'waiting',
        winner: null
    };

    await window.db.collection('games').doc(gameId).set(gameData);

    showGameBoard();
    playerStatusEl.textContent = `You are: Player X`;
    gameCodeEl.textContent = gameId;
    turnStatusEl.textContent = 'Waiting for opponent...';
    resultEl.textContent = '';

    listenToGame();

    window.history.pushState({}, '', `?game=${gameId}`);
}

// ====== JOIN GAME ======
async function joinGame(code) {
    gameId = code.toUpperCase();
    playerId = 'player_' + Date.now();

    const ref = window.db.collection('games').doc(gameId);
    const doc = await ref.get();

    if (!doc.exists) {
        resultEl.textContent = 'Game not found';
        return;
    }

    const data = doc.data();
    if (data.players.O !== null) {
        resultEl.textContent = 'Game is full';
        return;
    }

    playerSymbol = 'O';
    await ref.update({ 'players.O': playerId, status: 'playing' });

    showGameBoard();
    playerStatusEl.textContent = `You are: Player O`;
    gameCodeEl.textContent = gameId;
    resultEl.textContent = '';

    listenToGame();
    window.history.pushState({}, '', `?game=${gameId}`);
}

// ====== LISTENER (🔥 FIXED) ======
function listenToGame() {
    window.db.collection('games').doc(gameId)
        .onSnapshot((doc) => {
            if (!doc.exists) return;

            const data = doc.data();

            // ✅ FIX: SET STATE FIRST
            isMyTurn = (data.currentPlayer === playerSymbol);
            gameActive = (data.status === 'playing');

            // ✅ THEN UPDATE UI
            updateBoard(data.board);
            updateGameStatus(data);

            if (gameActive) {
                turnStatusEl.innerHTML = isMyTurn
                    ? `<b style="color:green">Your turn (${playerSymbol})</b>`
                    : `<span style="color:red">Opponent's turn</span>`;
            }

            restartBtn.style.display =
                data.status === 'finished' ? 'inline-block' : 'none';
        });
}

// ====== UPDATE BOARD ======
function updateBoard(board) {
    for (let i = 0; i < 9; i++) {
        const btn = buttons['b' + (i + 1)];
        btn.textContent = board[i];

        if (gameActive && isMyTurn && board[i] === '') {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = board[i] ? '1' : '0.5';
        }
    }
}

// ====== MAKE MOVE ======
async function makeMove(pos) {
    if (!gameActive || !isMyTurn) return;

    const ref = window.db.collection('games').doc(gameId);
    const doc = await ref.get();
    const data = doc.data();

    if (data.board[pos] !== '') return;

    const board = [...data.board];
    board[pos] = playerSymbol;

    const winner = checkWin(board);
    const draw = board.every(c => c !== '');

    const update = {
        board,
        currentPlayer: playerSymbol === 'X' ? 'O' : 'X'
    };

    if (winner || draw) {
        update.status = 'finished';
        update.winner = winner || 'draw';
    }

    await ref.update(update);
}

// ====== WIN CHECK ======
function checkWin(b) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let w of wins) {
        if (b[w[0]] && b[w[0]] === b[w[1]] && b[w[1]] === b[w[2]]) {
            return b[w[0]];
        }
    }
    return null;
}

// ====== STATUS ======
function updateGameStatus(data) {
    if (data.status === 'waiting') {
        turnStatusEl.textContent = 'Waiting for opponent...';
    } else if (data.status === 'finished') {
        if (data.winner === 'draw') {
            resultEl.textContent = 'Draw!';
        } else {
            resultEl.textContent = `${data.winner} wins!`;
        }
        turnStatusEl.textContent = 'Game Over';
    }
}

// ====== UI HELPERS ======
function showGameBoard() {
    gameMenu.style.display = 'none';
    gameBoard.style.display = 'block';
}

function restartGame() {
    if (gameId) {
        window.db.collection('games').doc(gameId).delete();
    }
    location.reload();
}

function copyInviteLink() {
    navigator.clipboard.writeText(window.location.href);
}
