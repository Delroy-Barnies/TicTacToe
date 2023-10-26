// game board function.
const gameBoard = (function () {
    const gameBoardContainer = document.getElementById("game_board");
    const board = document.querySelectorAll(".tile");
    let stopPlays = false;
    return { board, gameBoardContainer, stopPlays };
})();

// dialog for enemies html elements
const dialog = (function () {

    const textContainer = document.querySelector('.enemy_text_container');
    const displayWinner = document.querySelector('.winner');
    const winnerPerson = document.querySelector('.winner_person');
    const mistyDialog = document.querySelector('.stage_1');
    const wangDialog = document.querySelector('.stage_2');
    const irrinayDialog = document.querySelector('.stage_3');
    const startButton = document.getElementById('start_button');
    const secondStageButton = document.querySelector('.second_stage');
    const finalStageButton = document.querySelector('.final_stage');
    const root = document.querySelector(':root');

    return { textContainer, displayWinner, winnerPerson, mistyDialog, wangDialog, irrinayDialog, startButton, secondStageButton, finalStageButton, root };
})();

// enemy players image
const enemyPlayers = (function () {

    const misty = document.querySelector('.girl');
    const wang = document.querySelector('.man');
    const irrinay = document.querySelector('.dragon');

    return { misty, wang, irrinay };
})();


// enemies disabled
enemyPlayers.wang.setAttribute('style', 'display: none;');
enemyPlayers.irrinay.setAttribute('style', 'display: none;');
dialog.displayWinner.setAttribute('style', 'display: none;');


let origBoard;
let currantStage = 1;
const huPlayer = 'x';
const aiPlayer = 'o';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 1, 2, 5, 8],
    [0, 3, 6, 7, 8],
    [6, 7, 8, 5, 2],
    [2, 5, 8, 7, 6]
]


// start button to get past dialog
dialog.startButton.onclick = function () {

    enemyPlayers.misty.setAttribute('style', 'left: -160px;');
    origBoard = Array.from(Array(9).keys());

    setTimeout(() => {
        gameBoard.gameBoardContainer.setAttribute('style', "display: grid; background-image: url('images/wave-5265257_1920.jpg')");
        dialog.textContainer.setAttribute('style', 'display: none;');
        dialog.displayWinner.setAttribute('style', 'display: flex;');

        let board = gameBoard.board;
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener('click', turnClick, false);
        }

    }, 1000);
}

// continue to second stage button
dialog.secondStageButton.onclick = function () {

    gameBoard.stopPlays = false;
    currantStage++;

    gameBoard.gameBoardContainer.setAttribute('style', 'display: none;');
    dialog.displayWinner.setAttribute('style', 'display: none;');
    dialog.secondStageButton.setAttribute('style', 'display: none;');

    enemyPlayers.misty.setAttribute('style', 'display: none;');
    enemyPlayers.wang.setAttribute('style', 'display: block;');

    dialog.winnerPerson.textContent = "";
    dialog.textContainer.setAttribute('style', 'display: flex');
    dialog.mistyDialog.setAttribute('style', 'display: none');
    dialog.wangDialog.setAttribute('style', 'display: inline');

    dialog.root.setAttribute('style', 'background-color: rgb(18, 95, 121);');

    let board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
        board[i].textContent = "";
    }


    // start button to get past dialog
    dialog.startButton.onclick = function () {

        enemyPlayers.wang.setAttribute('style', 'left: -160px;');
        origBoard = Array.from(Array(9).keys());

        setTimeout(() => {
            gameBoard.gameBoardContainer.setAttribute('style', "display: grid; background-image: url('images/porcelain-16880_1920.jpg');");
            dialog.textContainer.setAttribute('style', 'display: none;');
            dialog.displayWinner.setAttribute('style', 'display: flex;');

            board = gameBoard.board;
            for (let i = 0; i < board.length; i++) {
                board[i].addEventListener('click', turnClick, false);
            }

        }, 1000);
    }
}

// continue to final stage button
dialog.finalStageButton.onclick = function () {

    gameBoard.stopPlays = false;
    currantStage++;

    gameBoard.gameBoardContainer.setAttribute('style', 'display: none;');
    dialog.displayWinner.setAttribute('style', 'display: none;');
    dialog.finalStageButton.setAttribute('style', 'display: none;');

    enemyPlayers.wang.setAttribute('style', 'display: none;');
    enemyPlayers.irrinay.setAttribute('style', 'display: block;');

    dialog.winnerPerson.textContent = "";
    dialog.textContainer.setAttribute('style', 'display: flex');
    dialog.wangDialog.setAttribute('style', 'display: none');
    dialog.irrinayDialog.setAttribute('style', 'display: inline');

    dialog.root.setAttribute('style', 'background-color: rgb(150, 150, 150);');

    let board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
        board[i].textContent = "";
    }


    // start button to get past dialog
    dialog.startButton.onclick = function () {

        enemyPlayers.irrinay.setAttribute('style', 'left: -160px;');
        origBoard = Array.from(Array(9).keys());

        setTimeout(() => {
            gameBoard.gameBoardContainer.setAttribute('style', "display: grid; background-image: url('images/coy-5135969_1920.png');");
            dialog.textContainer.setAttribute('style', 'display: none;');
            dialog.displayWinner.setAttribute('style', 'display: flex;');

            board = gameBoard.board;
            for (let i = 0; i < board.length; i++) {
                board[i].addEventListener('click', turnClick, false);
            }

        }, 1000);
    }
}


// checks whose turn it is currently
function turnClick(tile) {

    if (currantStage == 1) {
        if (typeof origBoard[tile.target.id] == 'number') {
            turn(tile.target.id, huPlayer);
            if (!checkTie() && !(gameBoard.stopPlays)) {
                turn(nextAvailableSpot(), aiPlayer);
            }
        }
    }
    else if (currantStage == 2) {
        if (typeof origBoard[tile.target.id] == 'number') {
            turn(tile.target.id, huPlayer);
            if (!checkTie() && !(gameBoard.stopPlays)) turn(randomSpot(), aiPlayer);
        }
    }
    else {
        if (typeof origBoard[tile.target.id] == 'number') {
            turn(tile.target.id, huPlayer);
            if (!checkTie() && !(gameBoard.stopPlays)) turn(bestSpot(), aiPlayer);
        }
    }
}

function nextAvailableSpot() {

    board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
        if (board[i].textContent == '') {
            return i;
        }
    }
}

function randomSpot() {
    board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
        if (board[i].textContent == '') {

            let computerChoice = Math.floor(Math.random() * 9);

            while (board[computerChoice].textContent == "o" || board[computerChoice].textContent == "x") {
                computerChoice = Math.floor(Math.random() * 9);
            }

            return computerChoice;
        }
    }
}

function Enemy(name) {
    return { name }
}

function turn(tileId, player) {
    origBoard[tileId] = player;
    document.getElementById(tileId).textContent = player;
    let gameWon = checkWin(origBoard, player);

    let enemy = new Enemy("");

    if (currantStage == 1) {
        enemy.name = "Misty";
        if (gameWon) {
            gameOver(gameWon, enemy);
            gameBoard.stopPlays = true;
        }
    }
    else if (currantStage == 2) {
        enemy.name = "Wang Yong";
        if (gameWon) {
            gameOver(gameWon, enemy);
            gameBoard.stopPlays = true;
        }
    }
    else {
        enemy.name = "Irrinay";
        if (gameWon) {
            gameOver(gameWon, enemy);
            gameBoard.stopPlays = true;
        }
    }

}

function checkWin(board, player) {

    // find every index the player has played in.
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);

    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }

    return gameWon;
}

// display game/round over 
function gameOver(gameWon, enemy) {

    const board = gameBoard.board;

    if (gameWon.player == huPlayer) {
        if (currantStage == 1) {
            dialog.winnerPerson.textContent = "Traveler You Win!";
            dialog.secondStageButton.setAttribute('style', 'display: inline;');
        }
        else if (currantStage == 2) {
            dialog.winnerPerson.textContent = "Traveler You Win!";
            dialog.finalStageButton.setAttribute('style', 'display: inline;');
        }
        else {
            dialog.winnerPerson.textContent = "Traveler You Win!";
        }
    }
    if (gameWon.player == aiPlayer) {
        if (currantStage == 1) {
            dialog.winnerPerson.textContent = `${enemy.name} Wins!`;
        }
        else if (currantStage == 2) {
            dialog.winnerPerson.textContent = `${enemy.name} Wins!`;
        }
        else {
            dialog.winnerPerson.textContent = `${enemy.name} Wins!`;
        }
    }

    for (let i = 0; i < board.length; i++) {
        board[i].removeEventListener('click', turnClick, false);
    }
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    //return emptySquares()[0];
    return minimax(origBoard, aiPlayer).index;
}

function checkTie() {

    let board = gameBoard.board;

    if (emptySquares().length == 0) {
        for (let i = 0; i < board.length; i++) {
            board[i].removeEventListener('click', turnClick, false);
            if (dialog.winnerPerson.textContent == '') {
                dialog.winnerPerson.textContent = "Its a tie!";
                return true;
            }
            else{
                return true;
            }

        }
    }

    return false;
}

function minimax(newBoard, player) {

    let availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, player)) {
        return { score: -10 };
    }
    else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    }
    else if (availSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

