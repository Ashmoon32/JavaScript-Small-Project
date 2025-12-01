const emojis = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍍"];
let cardsArray = [...emojis, ...emojis];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5 );
}

const gameContainer = document.querySelector(".game-container");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let timerInterval;

function createCards() {
    gameContainer.innerHTML = "";
    const shuffled = shuffle(cardsArray);
    shuffled.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = "";
        card.dataset.emoji = emoji;
        gameContainer.appendChild(card);


        card.addEventListener("click", () => flipCard(card));
    });


 // Reset moves, timer, and matched cards
  moves = 0;
  time = 0;
  movesCounter.textContent = "Moves: 0";
  timerDisplay.textContent = "Time: 0s";
  matchedCards = [];
  flippedCards = [];

  // Start timer
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}


function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(card) &&
    !matchedCards.includes(card)
  ) {
    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      movesCounter.textContent = `Moves: ${moves}`;
      checkMatch();
    }
  }
}

function checkMatch() {
    const [ card1, card2 ] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
  if (matchedCards.length === cardsArray.length) {
    clearInterval(timerInterval);
    setTimeout(() => alert(`You Win! 🎉 Time: ${time}s, Moves: ${moves}`), 200);
  }
}

restartBtn.addEventListener("click", createCards);

createCards();