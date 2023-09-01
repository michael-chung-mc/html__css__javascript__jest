
var scorePlayer = 0;
var scoreComputer = 0;

const scores = document.querySelector('.scores');

function getComputerChoice() {
    var choiceNumber = Math.floor(Math.random() * 10);
    var choice = "rock";
    if (choiceNumber % 2 == 0) {
        choice = "paper";
    }
    else if (choiceNumber % 3 == 0) {
        choice = "scissors";
    }
    else {
        choice = "rock";
    }
    console.log(`Odin-Bot chooses ... ${choice}!`);
    return choice;
}

function playRound(playerSelection, computerSelection) {
    var playerChoice = playerSelection.toLowerCase();
    var computerChoice = computerSelection.toLowerCase();
    var result = "Error"
    if (computerChoice == "rock") {
        if (playerChoice == "paper") {
            result = "paper vs rock = you won!";
            scorePlayer += 1;
        }
        else if (playerChoice == "scissors") {
            result = "scissors vs rock = Odin-Bot wins!"
            scoreComputer += 1;
        }
        else if (playerChoice == "rock") { result = "rock vs rock = its a tie!" }
        else { console.log("Illegal move") }
    }
    else if (computerChoice == "scissors") {
        if (playerChoice == "paper") {
            result = "paper vs scissors = Odin-Bot wins!";
            scoreComputer += 1;
        }
        else if (playerChoice == "scissors") { result = "scissors vs scissors = its a tie" }
        else if (playerChoice == "rock") {
            result = "rock vs scissors = you won!";
            scorePlayer += 1;
        }
        else { console.log("Illegal move") }
    }
    else if (computerChoice == "paper") {
        if (playerChoice == "paper") { result = "paper vs paper = its a tie!"; }
        else if (playerChoice == "scissors") {
            result = "scissors vs paper = you won!";
            scorePlayer += 1;
        }
        else if (playerChoice == "rock") {
            result = "rock vs paper = Odin-Bot wins!";
            scoreComputer += 1;
        }
        else { console.log("Illegal move") }
    }
    console.log(result)
    //return result;
    return this;
}

function checkScore () {
    scores.textContent = `Player: ${scorePlayer}\nOdin-Bot: ${scoreComputer}`;
    if (scorePlayer >= 5)
    {
        scores.textContent = "You Won!"
        scorePlayer = 0;
        scoreComputer = 0;
    }
    else if (scoreComputer >= 5)
    {
        scores.textContent = "Odin-Bot Wins!"
        scorePlayer = 0;
        scoreComputer = 0;
    }
}

const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissor = document.querySelector('.scissor');

rock.addEventListener('click', () => { 
    playRound("rock", getComputerChoice());
    checkScore();
});
paper.addEventListener('click', () => {
    playRound("paper", getComputerChoice());
    checkScore();
});
scissor.addEventListener('click', () => {
    playRound("scissor", getComputerChoice());
    checkScore();
});


// function game () {
//     var gameRounds = 5
//     console.log("Odin-Bot wants to play " + gameRounds + " rounds!")
//     for (let i = 0; i < gameRounds; i++) {
//         console.log(playRound(window.prompt("Odin-Bot asks for your move:"), getComputerChoice()));
//     }
// }