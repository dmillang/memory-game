/*
* Globals
*/

// Select the parent element deck  
const deck = document.querySelector(".deck");

// Array that will hold two toggled cards to compare them
let toggledCards = [];

// Moves counter
let moves = 0;

// global time variable
let time = 0;

// allow clock to be on or off
let clockOff = true;

// Identifier of the seconds passed since the first move
let clockId;


/*
* Objective: Shuffle the deck
*/

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
* Objective: Set up move counter // SOLVING BUG: FUNCTION MOVED UP IN THE TO SOLVE MODAL COUNTER COUNTING -1 MOVES //
*/

// Add 1 move to counter
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}


/*
* Objective: Set up star rating
*/

// Function to check score and call hideStar at move 10 and move 20
function checkScore() {
    if (moves === 15 || moves === 30) {
        hideStar();
    }
}

// Function to hide a star
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}


/*
* Objective: Display the card's symbol
*/

// Add event listener and use "classList" to know classes of the event.target
deck.addEventListener('click', function() {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        // start clock
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        // check if two cards match
        if (toggledCards.length === 2) {
            addMove();
            checkForMatch(clickTarget);
            checkScore();
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

// Add toggled cards to toggledCards array
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
}

// Check if cards in the array match
// If they match male 'match' class active by toggling it
// If they don't match toggle their 'open' and 'show' classes
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        console.log(matched);
        matched++;
        // Check if all cards have been matched
        if (matched === totalPairs) {
            gameOver();
        }
    } else {
        setTimeout(function() {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    };
}


/*
* Objective: Set up the clock
*/

// setInterval function to monitor each second and place it in clockId
function startClock() {
    clockId = setInterval(function() {
        time ++;
        displayTime();
    }, 1000);
}

// display time count by changing 'clock' class element in the HTML
function displayTime() {
    // set up seconds format
    let seconds = time % 60;
    // set up minutes format
    let minutes = Math.floor(time / 60);
    // apply seconds and minutes to the HTML
    const clock = document.querySelector('.clock');
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// stop the clock with clockId
function stopClock() {
    clearInterval(clockId);
}


/*
* Objective: Toggle visibililty of the modal pop-up board
*/

function toggleModal () {
    const modal = document.querySelector('.modal__background');
    modal.classList.toggle('hide');
}

/*
* Objective: Add data to the modal
*/

function writeModalStats() {
    const timeStat = document.querySelector('.modal__time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal__moves');
    const starsStat = document.querySelector('.modal__stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

// Get number of stars
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

writeModalStats(); // Write stats to modal


/*
* Objective: Add functionality to modal buttons
*/

// Cancel button
document.querySelector('.modal__button--cancel').addEventListener('click', function() {
    toggleModal();
});

// 'X' close button
document.querySelector('.modal__close').addEventListener('click', function() {
    toggleModal();
});

// Replay button
document.querySelector('.modal__button--replay').addEventListener('click', function() {
    resetGame();
});


// Function to reset the game
function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    shuffleDeck();
    toggledCards = []; // SOLVING BUG: RESET COUNTER OF FLIPPED CARDS WHEN RESETING AFTER ONLY FLIPPINF ONE CARD //
}

// Function to reset the clock and time
function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

// Function to reset moves
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// Function to reset stars
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

document.querySelector('.restart').addEventListener('click', function() {
    resetGame();
});

// Turn over new shuffled cards after reset
function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

// Modal pop-up replay button
function replayGame() {
    resetGame();
    toggleModal();
    resetCards();
}

document.querySelector('.modal__button--replay').addEventListener('click', function() {
    replayGame()
});

/*
* Objective: Activate modal pop-up after finishing the game
*/

let matched = 0;

const totalPairs = 8;

function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}

