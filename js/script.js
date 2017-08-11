// scripts.js file

var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame); 


var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

    pickRock.addEventListener('click', function() { playerPick('rock') }),
    pickPaper.addEventListener('click', function() { playerPick('paper') }),
    pickScissors.addEventListener('click', function() { playerPick('scissors') }),

    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    labelRock = document.getElementById('label-rock'),
    labelPaper = document.getElementById('label-paper'),
    labelScissors = document.getElementById('label-scissors');


//starting values
var gameState = 'notStarted', 
    player = {
        name: '',
        score: 0,
    },
    computer = {
        score: 0
    };


//interface elements
function setGameElements() {
  switch(gameState) {
    case 'started':
        computerPickElem.innerHTML = 'Computer selection';
        playerPickElem.innerHTML = 'Player selection';
        playerResultElem.innerHTML = 'Player score'
        computerResultElem.innerHTML = 'Computer score';
        generalResult.innerHTML = '';
        playerPickElem.style.color = ''
        computerPickElem.style.color = ''
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        labelRock.style.display = 'none';
        labelPaper.style.display = 'none';
        labelScissors.style.display = 'none';
      break;
    case 'ended':
        newGameElem.style.display = 'block';
        newGameBtn.innerText = 'Play again';
        labelRock.style.display = 'inline-block';
        labelPaper.style.display = 'inline-block';
        labelScissors.style.display = 'inline-block';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements()

//definiowanie newGame z poczatku kodu:

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    swal({
        title: 'Welcome to the game!',
        text: 'What\'s your name?',
        input: 'text',
        showCancelButton: true,

        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                if (value) {
                    resolve();
                } else {
                    reject('Don\'t be so shy... :)')
                }
            })
        }
    }).then(function (result) {
        player.name = result;

        swal({
        type: 'success',
        html: 'Good luck, ' + result + '. Let\'s start!'
        })

        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
            setGamePoints();
        }
    })
}

function playerPick(playerPick) {
    generalResult.innerHTML = ''
    playerPickElem.style.color = ''
    computerPickElem.style.color = ''

    movingChoicesForward();
    elementsInvisible();
    setTimeout(elementsVisible, 1400);
    setTimeout(movingChoicesBackward, 1200);

    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    setTimeout(checkRoundWinner, 800, playerPick, computerPick);
    changeIcons();
    disableClick();
}

function disableClick() {
    pickRock.setAttribute('disabled', 'disabled');
    pickRock.style.cursor = "pointer";
    pickScissors.setAttribute('disabled', 'disabled');
    pickScissors.style.cursor = "pointer";
    pickPaper.setAttribute('disabled', 'disabled');
    pickPaper.style.cursor = "pointer";
    setTimeout(enableClick, 1500);

}

function enableClick() {
    pickRock.removeAttribute('disabled', 'disabled');
    pickScissors.removeAttribute('disabled', 'disabled');
    pickPaper.removeAttribute('disabled', 'disabled');
}

function movingChoicesForward() {
    document.getElementById('js-playerPick').style.marginLeft = "25vw";
    document.getElementById('js-playerPick').style.fontSize = "32px";
    document.getElementById('js-computerPick').style.marginRight = "25vw";
    document.getElementById('js-computerPick').style.fontSize = "32px";
}
function movingChoicesBackward() {
    document.getElementById('js-playerPick').style.marginLeft = "0";
    document.getElementById('js-computerPick').style.marginRight = "0";
    document.getElementById('js-computerPick').style.fontSize = "16px";
    document.getElementById('js-playerPick').style.fontSize = "16px";
}
function elementsInvisible() {
    document.getElementById('js-playerResult').style.opacity = 0;
    document.getElementById('js-computerResult').style.opacity = 0;
}
function elementsVisible() {
    document.getElementById('js-playerResult').style.opacity = 1;
    document.getElementById('js-computerResult').style.opacity = 1;
}

function changeIcons() {
    if (playerPickElem.innerHTML === "paper") {
        playerPickElem.innerHTML = '<i class="fa fa-hand-paper-o"></i>'
    }
    else if (playerPickElem.innerHTML === "rock") {
        playerPickElem.innerHTML = '<i class="fa fa-hand-rock-o"></i>'
    }
    else {
        playerPickElem.innerHTML = '<i class="fa fa-hand-scissors-o"></i>'
    }

    if (computerPickElem.innerHTML === "paper") {
        computerPickElem.innerHTML = '<i class="fa fa-hand-paper-o"></i> ' 
    }
    else if (computerPickElem.innerHTML === "rock") {
        computerPickElem.innerHTML = '<i class="fa fa-hand-rock-o"></i>'
    }
    else {
        computerPickElem.innerHTML = '<i class="fa fa-hand-scissors-o"></i>'
    }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    generalResult = document.getElementById('js-generalResult');

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';
    generalResult.innerHTML = 'YOU WIN!!!'
    generalResult.style.color = "green"
    playerPickElem.style.color = 'green'
    computerPickElem.style.color = 'red'

    if (playerPick == computerPick) {
        winnerIs = 'noone';
        generalResult.innerHTML = 'DRAW'
        generalResult.style.color = "blue"
        playerPickElem.style.color = 'blue'
        computerPickElem.style.color = 'blue'
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) { 
        winnerIs = 'computer';
        generalResult.innerHTML = 'YOU LOSE!'
        generalResult.style.color = "red"
        playerPickElem.style.color = 'red'
        computerPickElem.style.color = 'green'
    }
    //drawing winner and loser
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        computerResultElem.innerHTML = "Lose!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        playerResultElem.innerHTML = "Lose!";
        computer.score++;
    } else if (winnerIs == 'noone') {
        playerResultElem.innerHTML = "Draw!";
        computerResultElem.innerHTML = "Draw!";
    }
    setGamePoints();
    setTimeout(checkIfGameIsOver, 1000);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkIfGameIsOver() {
    if (player.score === 5) {
        swal({
            title: "Sweet!",
            text: "You are the winner! If you like it, tell me about it! perczynski.radoslaw@gmail.com",
            imageUrl: 'images/win.png',
            imageHeight: 100
        });
        gameState = 'ended';
        setGameElements()
    } else if (computer.score === 5) {
        swal({
            title: "Sorry",
            text: "Computer smashed you! Try to be more clever next time.",
            imageUrl: "images/death.png",
            imageHeight: 100
        });
        gameState = 'ended';
        setGameElements()
    }
}