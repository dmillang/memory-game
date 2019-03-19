# Memory Game Project

## Table of Contents

* [Dependencies](#dependencies)
* [Instructions](#instructions)
* [How to Play](#How%20to%20Play)

## Dependencies

* Card icons come from [FontAwesome](https://fontawesome.com/start "Start using Font Awesome") online icon set.
* Coda, the font being used for this project, comes from [Google Fonts](https://fonts.google.com/specimen/Coda?query=coda "Coda in Google Fonts").
* HTML5 content for inital structure can be found on the [index.html](index.html) file.
* CSS3 content for styling can be found on the [app.css](css/app.css) file.
* ES6 JavaScript content for functionality can be found on the [app.js](js/app.js) file.
* A list of elements that will be excluded when using Git/Github can be found on the [.gitignore](.gitignore) file.

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## How to Play

### How to Win

* The objective of this game is to match all cards with as few moves as possible.
* One move is defined by flipping over two cards that are facing down. If the two cards have the same icon, it counts as a match.
* The user is encouraged to match all cards as quick as possible, although time has no influence on the final score.
* The score is controled by a star rating system that goes from 3 to 1 stars: One star is substracted on the move number `15` and another one on the move number `30`.

### About the Game Interface

* The user can find on top of the board a reset icon to restart the game at anytime.
* The user can find on top of the board the current star rating, number of moves made, and elapsed time since first move.
* Once all cards have been matched, a modal pop-up displays the final stats, and offers to reset the board to play again or just close the pop-up.
* Each time the game is reset all the cards are shuffled on the board using the [Fisher-Yates Modern Algorith](https://github.com/dmillang/Fisher-Yates-Shuffle "How to shuffle an array using JavaScript") method.