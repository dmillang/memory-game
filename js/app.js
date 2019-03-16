/*
 * Create a list that holds all of your cards
*/


/*
* Objective: Shuffle the deck
*/

// Select the parent element deck  
const deck = document.querySelector(".deck");

// Function to shuffle the deck before starting
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

/*
* Objective: Display the card's symbol
*/

// Add event listener and use "classList" to know classes of the event.target
deck.addEventListener('click', function() {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
        }
    }
});

// Create toggling function
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Validate clicked card
function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 && 
        !toggledCards.includes(clickTarget)  
    );
}


/*
* Objective: Add the card to a list of open cards
*/

// Array that will hold two toggled cards to compare them
let toggledCards = [];

// Add toggled cards to toggledCards array
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// Check if cards in the array match
// If they match male 'match' class active by toggling it
// If they don't match toggle their 'open' and 'show' classes
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
    } else {
        setTimeout(function() {
            console.log("not a match");
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    };
}