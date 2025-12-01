const emojis = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍍"];
let cardsArray = [...emojis, ...emojis];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5 );
}

const gameContainer = document.querySelector(".game-container");

let flippedCards = [];
let matchedCards = [];

function createCards() {
    const shuffled = shuffle(cardsArray);
    shuffled.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = "";
        card.dataset.emoji = emoji;
        gameContainer.appendChild(card);


        card.addEventListener("click", () => flipCard(card));
    });
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
        setTimeout(() => alert("You Win! 🎉"), 200);
    }
}

createCards();