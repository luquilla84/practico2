const options = ["piedra", "papel", "tijera"];
const optionImages = document.querySelectorAll(".option");
const playerNameInput = document.getElementById("player-name");
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
const overlay = document.getElementById("overlay");
const winnerMessage = document.getElementById("winner-message");
const playAgainButton = document.getElementById("play-again");

let playerWins = 0;
let computerWins = 0;
let totalAttempts = 0;


function showOverlay(message) {
    winnerMessage.textContent = message;
    overlay.style.display = "flex";
}

function hideOverlay() {
    overlay.style.display = "none";
}

playAgainButton.addEventListener("click", function () {
    hideOverlay();
    resetGame();
});


function updateScore() {
    scoreDiv.textContent = `Jugador: ${playerWins} - PC: ${computerWins}`;
}

function checkWinner() {
    if (playerWins === 3) {
        showOverlay("¡Felicidades! ¡Has ganado el juego!");
        disableOptions();
    } else if (computerWins === 3) {
        showOverlay("¡La PC ha ganado el juego!");
        disableOptions();
    } else if (totalAttempts === 5) {
        showOverlay("Fin del juego. Nadie ha llegado a 3 victorias.");
        disableOptions();
    } else {
        updateScore();
    }
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "Empate!";
    } else if ((player === "piedra" && computer === "tijera") ||
        (player === "papel" && computer === "piedra") ||
        (player === "tijera" && computer === "papel")) {
        playerWins++;
        return "¡Ganaste!";
    } else {
        computerWins++;
        return "¡Perdiste!";
    }
}

function disableOptions() {
    optionImages.forEach(optionImage => {
        optionImage.removeEventListener("click", handlePlayerChoice);
    });
}

function enableOptions() {
    optionImages.forEach(optionImage => {
        optionImage.addEventListener("click", handlePlayerChoice);
    });
}


function handlePlayerChoice() {
    const playerOption = this.id;
    const computerOption = options[Math.floor(Math.random() * options.length)];

    const playerName = playerNameInput.value;
    if (!playerName) {
        resultDiv.textContent = "Por favor, ingresa tu nombre antes de jugar.";
        return;
    }

    const resultText = determineWinner(playerOption, computerOption);
    resultDiv.textContent = `${resultText} Elegiste ${playerOption} y la PC eligió ${computerOption}.`;

    // Agregar la clase de animación y luego quitarla después de la animación
    this.classList.add("rotate-animation");
    const optionElement = this;
    setTimeout(function () {
        optionElement.classList.remove("rotate-animation");
    }, 1000);

    checkWinner();
}

optionImages.forEach(optionImage => {
    optionImage.addEventListener("click", handlePlayerChoice);
});

optionImages.forEach(optionImage => {
    optionImage.addEventListener("click", handlePlayerChoice);
});

restartButton.addEventListener("click", function () {
    playerWins = 0;
    computerWins = 0;
    totalAttempts = 0;
    playerNameInput.value = "";
    resultDiv.textContent = "";
    updateScore();
    enableOptions();
});
