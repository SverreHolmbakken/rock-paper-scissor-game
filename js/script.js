const playerOptions = document.querySelector(".player-options");
const options = document.querySelectorAll(".option");
const computerOptions = document.querySelector(".computer-options");
const gameDescription = document.querySelector(".game-description");
const gameScore = document.querySelector(".game-score");
const totalScoreDisplay = document.querySelector(".total-score-player");
const totalScoreDisplayComputer = document.querySelector(".total-score-computer");

let playerScore = 0;
let computerScore = 0;
let playerTotalScore = Number(localStorage.getItem("playerTotalScore")) || 0;
let computerTotalScore = Number(localStorage.getItem("computerTotalScore")) || 0;

function computerPlay() {
	const choices = ["rock", "paper", "scissors"];
	const randomIndex = Math.floor(Math.random() * choices.length);
	if (choices[randomIndex] === "rock") {
		computerOptions.innerHTML = `
			<div class="option__computer option">
				<img src="/assets/rock.png">
			</div>
		`;
		console.log("rock")
	} else if (choices[randomIndex] === "scissors") {
		computerOptions.innerHTML = `
			<div class="option__computer option">
				<img src="/assets/scissors.png">
			</div>
		`;
		console.log("scissors")
	} else if (choices[randomIndex] === "paper") {
		computerOptions.innerHTML = `
			<div class="option__computer option">
				<img src="/assets/paper.png">
	 		</div>
		`;
		console.log("paper")
	}
	return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return "Draw!";
	} else if (
		(playerSelection === "rock" && computerSelection === "scissors") ||
		(playerSelection === "paper" && computerSelection === "rock") ||
		(playerSelection === "scissors" && computerSelection === "paper")
	) {
		playerScore++;
		return "You won!";
	} else {
		computerScore++;
		return "You lost :(";
	}
}

function endGame() {
	if (playerScore > computerScore) {
		gameDescription.textContent = "Congratulations, you won!";
		localStorage.setItem("playerTotalScore", playerTotalScore+1);
		playerTotalScore = Number(localStorage.getItem("playerTotalScore")) || 0;
		playerOptions.style.backgroundColor = "#4fba4f"
	} else if (playerScore < computerScore) {
		gameDescription.textContent = "Sorry, you lost!";
		localStorage.setItem("computerTotalScore", computerTotalScore+1);
		computerTotalScore = Number(localStorage.getItem("computerTotalScore")) || 0;
		playerOptions.style.backgroundColor = "#d84b4b"
	} else {
		gameDescription.textContent = "Draw!";
	}

	playerScore = 0;
	computerScore = 0;

	// Updates scores after finished game
	totalScoreDisplay.textContent = playerTotalScore;
	totalScoreDisplayComputer.textContent = computerTotalScore;
}

//Shows total score at all times
totalScoreDisplay.textContent = playerTotalScore;
totalScoreDisplayComputer.textContent = computerTotalScore;


options.forEach(option => {
	option.addEventListener("click", function() {
		const playerSelection = this.id;
		const computerSelection = computerPlay();
		const roundgameDescription = playRound(playerSelection, computerSelection);
		playerOptions.style.backgroundColor = null; // Resets the backgroud color of the players options after each round
		gameScore.innerHTML = `
			<h2 class="game-score__player">${playerScore}</h2>
			<h2 class="game-score__computer">${computerScore}</h2>
		`;
		gameDescription.textContent = roundgameDescription;
		if (playerScore === 2 || computerScore === 2) {
			endGame();
		}
  });
});
