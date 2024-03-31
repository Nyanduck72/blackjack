let cards = [
    ["2♥", 2], ["2♦", 2], ["2♣", 2], ["2♠", 2],
    ["3♥", 3], ["3♦", 3], ["3♣", 3], ["3♠", 3],
    ["4♥", 4], ["4♦", 4], ["4♣", 4], ["4♠", 4],
    ["5♥", 5], ["5♦", 5], ["5♣", 5], ["5♠", 5],
    ["6♥", 6], ["6♦", 6], ["6♣", 6], ["6♠", 6],
    ["7♥", 7], ["7♦", 7], ["7♣", 7], ["7♠", 7],
    ["8♥", 8], ["8♦", 8], ["8♣", 8], ["8♠", 8],
    ["9♥", 9], ["9♦", 9], ["9♣", 9], ["9♠", 9],
    ["10♥", 10], ["10♦", 10], ["10♣", 10], ["10♠", 10],
    ["J♥", 10], ["J♦", 10], ["J♣", 10], ["J♠", 10],
    ["Q♥", 10], ["Q♦", 10], ["Q♣", 10], ["Q♠", 10],
    ["K♥", 10], ["K♦", 10], ["K♣", 10], ["K♠", 10],
    ["A♥", [1, 11]], ["A♦", [1, 11]], ["A♣", [1, 11]], ["A♠", [1, 11]]
];

let dealer_cards = document.getElementById("dealer");
let dealerTotal = document.getElementById("dealerTotal");
let cardsForDealer = [];
let dealerCardValue = 0;

let user_cards = document.getElementById("userCards");
let userTotal = document.getElementById("userTotal");
let cardsDealtToUser = [];
let userCardValue = 0;

let resultText = document.getElementById("result");

let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");
let IsStanding = false;

function Refresh() {
    user_cards.innerHTML = "";
    dealer_cards.innerHTML = "";

    cardsDealtToUser.forEach(card => {
        let cardElement = document.createElement("p");
        cardElement.textContent = card[0];
        cardElement.classList.add(getSuitClass(card[0])); // Add suit-specific class
        user_cards.appendChild(cardElement);
    });
    cardsForDealer.forEach(card => {
        let cardElement = document.createElement("p");
        cardElement.textContent = card[0];
        cardElement.classList.add(getSuitClass(card[0])); // Add suit-specific class
        dealer_cards.appendChild(cardElement);
    });

    userCardValue = calculateTotal(cardsDealtToUser);
    dealerCardValue = calculateTotal(cardsForDealer);

    userTotal.textContent = `Total: ${userCardValue}`;
    dealerTotal.textContent = `Total: ${dealerCardValue}`;

    checkResult();
}

// Function to determine suit-specific class
function getSuitClass(card) {
    if (card.includes("♥") || card.includes("♦")) {
        return "red-suit";
    } else {
        return "black-suit";
    }
}

function getSuitClass(card) {
    if (card.includes("♥") || card.includes("♦")) {
        return "red-suit";
    } else {
        return "black-suit";
    }
}

function calculateTotal(cards) {
    let total = 0;
    let numAces = 0;

    cards.forEach(card => {
        if (Array.isArray(card[1])) {
            total += card[1][1]; // Use the higher value for Aces initially
            numAces++;
        } else {
            total += card[1];
        }
    });

    // Adjust the total for Aces
    while (total > 21 && numAces > 0) {
        total -= 10; // Change an Ace from 11 to 1
        numAces--;
    }

    return total;
}

function checkResult() {
    if (userCardValue > 21 && dealerCardValue > 21) {
        resultText.textContent = "No winner";
        standButton.disabled = true; // Disable the stand button after player busts
        setTimeout(() => {
            location.reload(); // Reload the page after 2 seconds
        }, 2000);
    } else if (userCardValue > 21) {
        resultText.textContent = "Player busts!";
        standButton.disabled = true; // Disable the stand button after player busts
        setTimeout(() => {
            location.reload(); // Reload the page after 2 seconds
        }, 2000);
    } else if (dealerCardValue > 21) {
        resultText.textContent = "Dealer busts!";
        standButton.disabled = true; // Disable the stand button after player busts
        setTimeout(() => {
            location.reload(); // Reload the page after 2 seconds
        }, 2000);
    } else {
        // No bust, continue game
        resultText.textContent = "";
    }

    if ((userCardValue >= 17 && dealerCardValue >= 17) && (userCardValue <= 21 && dealerCardValue <= 21)) {
        userCardValue > dealerCardValue ? resultText.textContent = "Player wins!" : resultText.textContent = "Dealer wins!"
        if (dealerCardValue === userCardValue) {
            resultText.textContent = "It's a push!"
        }
        standButton.disabled = true; // Disable the stand button after player busts
        setTimeout(() => {
            location.reload(); // Reload the page after 2 seconds
        }, 2000);
    }
}

function Hit() {
    if (!IsStanding && userCardValue < 21) {
        let card = cards[Math.floor(Math.random() * cards.length)];
        cardsDealtToUser.push(card);
        cards.splice(cards.indexOf(card), 1);
    }
    Refresh();
}

function Dealer() {
    while (dealerCardValue < 17) {
        let card = cards[Math.floor(Math.random() * cards.length)];
        cardsForDealer.push(card);
        cards.splice(cards.indexOf(card), 1);
        Refresh();
    }
}

hitButton.addEventListener("click", () => {
    Hit();
});

standButton.addEventListener("click", () => {
    IsStanding = true;
    Dealer();
});

Refresh(); // Initial card deal
