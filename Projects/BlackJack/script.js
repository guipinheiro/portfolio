let card1 = 0;
let card2 = 0;
let hand = [];
let cardSum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let deck = [];
let player = {
	name: "Gui",
	chips: 100,
};

let messageEl = document.querySelector("#message-el");
//let sumEl = document.getElementById("sum-el");
//using query selector
let cardsEl = document.querySelector("#cards-el");
let sumEl = document.querySelector("#sum-el");

let playerEl = document.querySelector("#player-el");
playerEl.textContent = `${player.name}: $${player.chips}`;

const getRandomCard = () => Math.floor(Math.random() * deck.length);

const handSum = () => {
	cardSum = hand.reduce(function (x, y) {
		return x + y;
	}, 0);
};

const returnHand = () => {
	//Add to the cards string all cards in hand
	let handStr = "";
	hand.forEach((element) => {
		handStr += `${element} -- `;
	});
	handStr = handStr.slice(0, handStr.length - 4);
	cardsEl.textContent = `Cards: ${handStr}`;
};

const renderGame = () => {
	returnHand();
	handSum();
	sumEl.textContent = `Sum: ${cardSum}`;

	//Checks hand state
	if (cardSum < 21) {
		message = "Do you want to draw a new card?";
	} else if (cardSum === 21) {
		message = "Blackjack! You've won!";
		hasBlackJack = true;
		player.chips += 5;
		playerEl.textContent = `${player.name}: $${player.chips}`;
	} else {
		message = "You've lost. Start a new game?";
		isAlive = false;
		player.chips -= 5;
		playerEl.textContent = `${player.name}: $${player.chips}`;
	}

	messageEl.textContent = message;
};

const startGame = () => {
	isAlive = true;
	hasBlackJack = false;
	messageEl.setAttribute("style", "color: rgba(245, 245, 245, 0.829)");
	deck = [
		1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];
	cardId = getRandomCard();
	card1 = deck[cardId];
	deck.splice(cardId, 1);

	cardId = getRandomCard();
	card2 = deck[cardId];
	deck.splice(cardId, 1);

	hand = [card1, card2];
	renderGame();
};

const draw = () => {
	//Check if able to draw a new card
	handSum();

	if (isAlive === false) {
		messageEl.textContent = "You haven't started the game yet.";
		messageEl.setAttribute("style", "color: red");
	} else if (cardSum >= 21) {
		//Can't draw new cards, so gets a text and don't change the game
		messageEl.textContent = "You cannot draw new cards. You've lost. Please STOP!";
		messageEl.setAttribute("style", "color: red");
	} else {
		//Draws new card, and check game status
		cardId = getRandomCard();
		newCard = deck[cardId];
		deck.splice(cardId, 1);
		hand.push(newCard);
		cardSum += newCard;
		renderGame();
	}
};
