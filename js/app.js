/*-------------------------------- Constants --------------------------------*/

// const gameTheme = new Audio('../assets/audio/music/main_theme.mp3')
// const xBtnSfx = new Audio('../assets/audio/buttons/O.mp3')
// const oBtnSfx = new Audio('../assets/audio/buttons/X.mp3')

/*---------------------------- Variables (state) ----------------------------*/

let board = [null, null, null, null, null, null, null, null, null];
let players =['x', 'o'] 
let scores = {
    h: 0,
    b: 0
}
let whoseTurn = 0;
let winner = null;


/*------------------------ Cached Element References ------------------------*/

let boardEls = document.querySelectorAll('#grid div');
let currentPlayerBox = document.querySelector('#player-select');

/*----------------------------- Event Listeners -----------------------------*/

for(let i= 0; i < boardEls.length; i++) {
    boardEls[i].addEventListener('click', selectTile)
};

let playAgainBtn = document.querySelector('#play-again');
playAgainBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init();

function selectTile(event) {
    if(!winner) {
        let tileEl = event.currentTarget
        let chosenTile = event.currentTarget.getAttribute('data-tile')
        let text = players[whoseTurn]

        if(board[chosenTile - 1] === null) {
            // Update class
            tileEl.children[1].innerText = text

            // Update color
            if(whoseTurn === 0) {
                tileEl.classList.add('yellow')
            } else if(whoseTurn === 1) {
                tileEl.classList.add('pink')
            }

            // Update board
            board[chosenTile - 1] = whoseTurn

            if(!checkWinner()) {
                nextPlayer()
            }
        }
    }
    
};

function checkWinner() {
    console.log("RUNNING CHECKWINNER");
    let winConditions = [[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [1,4,7], [2,5,8], [3,6,9]]
    let counter = 0
    let winningTiles = [null, null, null]
    winConditions.forEach(function (array){
        // board = [0, 1, null, etc.]
        if(counter != 3) {
            counter = 0
            winningTiles = [null, null, null];
            array.forEach(function (index){
                if(board[index - 1] === whoseTurn) {
                    counter++
                    winningTiles[index - 1] = index;
                }
            })
        }
    })
    console.log(counter);
    if(counter === 3) {
        winner = players[whoseTurn];
        endGame('win', winningTiles);
    } else if(board.includes(null)) {
        return false
    } else {
        endGame('tie')
    }
    return true;
}

function endGame(result, winningTiles) {
    console.log("RUNNING ENDGAME");
    // Change color of tiles to green when a player wins
    // Update Its your turn to wins the game
    // Add score to winning player if there is one
    if(result === 'win') {
        for(let i = 1; i <= winningTiles.length; i++) {
            setTimeout(() => {
                boardEls[winningTiles[i-1]-1].className = 'green';
            }, i * 120);
        }
        document.querySelector('#player-text').innerText = 'wins the game!'

        if(whoseTurn === 0) {
            scores.h++;
            document.querySelector('#h-score').innerText = scores.h;
        } else {
            scores.b++;
            document.querySelector('#b-score').innerText = scores.b;
        }
    } else if(result === 'tie') {
        currentPlayerBox.children[0].innerText = 'Tie!'
        currentPlayerBox.className = '';
        document.querySelector('#player-text').innerText = 'wanna rematch?'
    }
}

function nextPlayer() {
    if(whoseTurn === 0) {
        whoseTurn = 1
        currentPlayerBox.children[0].innerText = 'Ozies';
        currentPlayerBox.className = 'pink';
    } else if (whoseTurn === 1) {
        whoseTurn = 0
        currentPlayerBox.children[0].innerText = 'Exies';
        currentPlayerBox.className = 'yellow';
    }
}

function init() {
    // Resets the Game
    board = [null, null, null, null, null, null, null, null, null];
    whoseTurn = 0;
    currentPlayerBox.children[0].innerText = 'Exies';
    document.querySelector('#player-text').innerText = "It's your turn!"
    boardEls.forEach(element => {
        element.className = '';
        element.children[1].innerText = ''
    });
    boardEls = document.querySelectorAll('#grid div');
    currentPlayerBox = document.querySelector('#player-select');
    currentPlayerBox.className = 'yellow';
    winner = null;
};
