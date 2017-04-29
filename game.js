var gameOn = false;

// This variable would be best changed to reference a file containing a larger list of words (**csv file maybe) and build objects based on the data sets
var words = {
	word: ["bombtrack", "guerilla radio", "bulls on parade", "renegades of funk", "sleep now in the fire", "down rodeo", "wake up"],
	image: ["ratm.jpg", "tbola.jpg", "ee.jpg", "r.jpg", "tbola.jpg", "ee.jpg", "ratm.jpg"],
	hint: ["Oklahoma City", "Iran Contra", "Michael Jordan", "Afrika Bambaataa", "Resting Here Could Be Hot!", "Fancy Shopping in Beverly Hills", "Breakfast Time"],
};

var wordString = [];
var letterString = "";
var previousNum = null;
var currentNum = null;
var countGuess = false;
var countTimes = 0;
var guessesRemaining = 0;
var guessedArray = [];
var scoreCorrect = 0;
var scoreSkipped = 0;


function setMedia() {
	if (previousNum === null) {
		// display base image in main section and play background music
		$("#footerAudio").html("<audio autoplay=\"autoplay\" controls=\"controls\"><source src=\"assets/audio/basemusic.mp3\" /></audio>");
		$("#mainImage").html("<img src=\"assets/images/baseImage.jpg\" width=\"100%\">");
	} else {
		// display words.image[previousNum] in main section
		// play previousNum.mp3 in background
		$("#footerAudio").html("<audio autoplay=\"autoplay\" controls=\"controls\"><source src=\"assets/audio/" + previousNum + ".mp3\" /></audio>");
		$("#mainImage").html("<img src=\"assets/images/" + words.image[previousNum] + "\" width=\"100%\">");
	}
}

// Gets random number from function, uses it t retrieve an index of the word array
function getRandomNum() {
	var randomNum = Math.floor(Math.random() * words.word.length);
	currentNum = randomNum;
}

// Guesses remaining for player is half of the total characters of the word retrieved (*rounded down for halves)
function getWord() {
	// Protect against duplicate words back-to-back
	while (previousNum == currentNum) {
		getRandomNum();
	}
		var characterArray = [];
		wordString = words.word[currentNum];
		guessesRemaining = Math.floor((wordString.length/2));
}

function displayWord() {
	// Clear old word
	clearWord();
	// explode wordString to space lettering
	characterArray = wordString.split('');
	var guessed = false;
	var trueCount = 0;
	var trueGoal = characterArray.length;
	
	for (i = 0; i < wordString.length; i++) {
		
		var letterToUnderscore = characterArray[i];

		// Checks character for a space, if so put a non-underlined space div and continue through array
		if (letterToUnderscore === " ") {
			var letterSpan = document.createElement("div");
			letterSpan.className = "underscoreNo";
			letterSpan.innerHTML = "";
			document.getElementById("wordGuess").appendChild(letterSpan);
			trueCount += 1;

		} else {

			// Check the current non-space letter against the list of guessed letters
			for (var j = 0; j < guessedArray.length; j++) {

				var guessedArrayString = String.fromCharCode(guessedArray[j]);
				if (letterToUnderscore === guessedArrayString) {
					guessed = true;
				}
			}

			// Check to see if letter has been guessed.  If so, reveal it. If not, keep hidden with ? mark
			if (guessed === true) {
				letterSpan = document.createElement("div");
				letterSpan.className = "underscoreYes";
				letterSpan.innerHTML = letterToUnderscore.toUpperCase();
				document.getElementById("wordGuess").appendChild(letterSpan);
				trueCount += 1;
			} else {
				letterSpan = document.createElement("div");
				letterSpan.className = "underscoreYes smallerText";
				letterSpan.innerHTML = "?";
				document.getElementById("wordGuess").appendChild(letterSpan);
			}
		}
		guessed = false;
	}

	// Check to see if the players has enough letters guessed to win the round
	if (trueCount == trueGoal) {
		gameWin();
	}

	// Refreshed the letter guessed section reflecting changes to key presses made
	$("#lettersGuessed").html("<h3>Guesses Remaining: " + guessesRemaining + "</h3>");
	$("#lettersGuessed").append("<div>Letters Guessed Already</div>");
	$("#lettersString").text(letterString);
}

// Monitors the key pressed event to determine if the key pressed was a letter.  If so, adds to the guessed letters array (guessedArray)
function keyPressed() {
	if (gameOn === true) {
		var key = event.keyCode;
		if (key > 64 && key < 91) {
			
			countGuess = true;

			// Checks to see if letter guessed is in the word
			var keyString = String.fromCharCode(key + 32);
			for (var j = 0; j < characterArray.length; j++) {
				if (keyString == characterArray[j]) {
					countGuess = false;
					console.log(keyString);
					console.log(characterArray[j]);
					console.log(countGuess);
				} 
			}

			// Checks to see if letter was already guessed
			var keyNumber = (key + 32);
			for (var k = 0; k < guessedArray.length; k++) {
				if (keyNumber == guessedArray[k]) {
					countGuess = true;
					console.log(k);
					console.log(keyNumber);
					console.log(guessedArray[k]);
					console.log(countGuess);
				} 
			}

			// If letter pressed is not in the word or has already been guessed, increment down Guesses Remaining
			if (countGuess == true) {
				guessesRemaining -= 1;
			}

			guessedArray.push(key + 32);
			letterString += String.fromCharCode(key) + ", ";
			$("#lettersString").text(letterString);
			displayWord();

			// If guesses remaining run out, player losses
			if (guessesRemaining == 0) {
				gameLose();
			}

		} else {
			alert("That is not a valid letter!");
		}
	}
}

// Clears the divs representing the letters of the word to be guessed
function clearWord() {
	$("#wordGuess").html("");
}

// Clears the letters guessed section
function clearScreen() {
	letterString = "";
	$("#lettersGuessed").html("<h3>Guesses Remaining: " + guessesRemaining + "</h3>");
	$("#lettersGuessed").append("<div>Letters Guessed Already</div>");
	$("#lettersString").text(letterString);
}

// Resets the scores counters
function clearScore() {
	scoreCorrect = 0;
	scoreSkipped = 0;
	updateScore();
}

// Updates the score sections to reflect current scores
function updateScore() {
	$("#wordsCorrect").html("<h5>Words Guessed Correctly: </h5><h3>" + scoreCorrect + "</h3>");
	$("#wordsSkipped").html("<h5>Words Skipped: </h5><h3>" + scoreSkipped + "</h3>");
}

//"New Game" button function to begin game
function startGame() {
	// Set variables
	previousNum = null;
	gameOn = true;
	guessedArray = [];
	letterString = "";
	// Clear displays
	clearWord();
	clearScreen();
	clearScore();
	updateScore();
	// Set displays and media
	setMedia();
	getRandomNum();
	getWord();
	displayWord();

}

// "Get Hint" button provides an alert with a clue (pulled from the array) to solving the current word
function hintWord() {
	if (currentNum == null) {
		alert("There is no hint right now...try starting a game!");
	} else {
		alert("Your hint is: " + words.hint[currentNum]);
	}
}

// "Skip Word" button function to skip current word and increment the "Words Skipped" counter
function skipWord() {
	if (currentNum == null) {
		alert("You can't skip right now...try starting a game!");
	} else {
		// Set variables
		previousNum = currentNum;
		scoreSkipped += 1;
		guessedArray = [];
		updateScore();
		// Clear displays
		clearWord();
		clearScreen();
		// Set displays and media
		getRandomNum();
		getWord();
		displayWord();
	}
}

// Game is won, congratulate player, increment the game score up, restart game
function gameWin() {
	//Set variables
	previousNum = currentNum;
	scoreCorrect += 1;
	guessedArray = [];
	updateScore();
	alert("Good job! You guessed the word");
	// Clear displays
	clearWord();
	clearScreen();
	// Set displays and media
	setMedia();
	getRandomNum();
	getWord();
	displayWord();
}

// Game is lost, clear all and start over
function gameLose() {
	alert("Oh no! You ran out of guesses. Go ahead and try again");
	startGame();
}


// Listens for key pressed events
document.onkeyup = function() {keyPressed()};
