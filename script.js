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
let cardsForDealer = [];
var dealerCardValue;

let user_cards = document.getElementById("userCards");
let cardsDealtToUser = [];
var userCardValue;

let Stand = document.getElementById("stand");
let IsStanding = false;

function Refresh() {
    cardsDealtToUser.map((i) => {
        user_cards.innerHTML = user_cards.innerHTML + `<p>${cardsDealtToUser[i][0]}</p>`;
        userCardValue = cardsDealtToUser[i][1].reduce((acc, card) => {
            return acc + card;
        }, 0);
    });
    cardsForDealer.map((i) => {
        dealer_cards.innerHTML = dealer_cards.innerHTML + `<p>${cardsForDealer[i][0]}</p>`;
        dealerCardValue = cardsForDealer[i][1].reduce((acc, card) => {
            return acc + card;
        }, 0);
    });
}

function Hit() {
    if (!IsStanding && userCardValue < 21) {
        let card = cards[Math.floor(Math.random() * cards.length)];
        cardsDealtToUser.push(card);
        IsAce(card, userCardValue);
        cards.splice(indexOf(card), 1);
    } else {
        Dealer();
    }
    Refresh();
}

Stand.addEventListener("click", () => {
    IsStanding = true;
});

function Dealer() {
    while (dealerCardValue < 17) {
        if (IsStanding) {
        let card = cards[Math.floor(Math.random() * cards.length)];
        cardsForDealer.push(card);
        IsAce(card, dealerCardValue);
        cards.splice(indexOf(card), 1);
        }
        Refresh();
    }
}

//Ace value handler
function IsAce(card, currentValue) {
    if (card[0] === "A♥" || card[0] === "A♦" || card[0] === "A♣" || card[0] === "A♠") {
        currentValue + card[1][1] <= 21 ? card[1][0].shift() : card[1][1].pop();
    }
}