var alphabetArray = [];
var words = {
	word: ["word1", "word2", "word3", "word4", "word5"],
	image: ["img1", "img2", "img3", "img4", "img5"],
	song: ["song1", "song2", "song3", "song4", "song5"],
	page: ["page1", "page2", "page3", "page4", "page5"],
};
var previousNum = null;
var currentNum = null;
var score = 0;
var lettersRemaining = 0;
var passedWords = 0;


function makeAlphabetArray() {
	// var alphabetArray = [];
	for (i = 65; i < 91; i++) {
		var letter = String.fromCharCode(i);
		alphabetArray.push(letter);
	}
}

function setMedia() {
	if (currentNum === null) {
		//display base image in main section
		//play base song in background
		$("#mainImage").html("<img src=\"assets/images/baseImage.jpg\" width=\"100%\">");
	} else {
		//display words.image[currentNum] in main section
		//play words.song[currentNum] in background
		$("#mainImage").html("<img src=\"assets/images/placeholder.png\" width=\"100%\">");
	}
}

function getWord() {
	var underscoreArray = [];
	var underscoreString = "";
	var characterArray = [];
	var randomNum = Math.floor(Math.random() * words.word.length);
	var wordString = words.word[randomNum];
	console.log(wordString);

	//explode wordString to space lettering
	characterArray = wordString.split('');
	
	for (i = 0; i < wordString.length; i++) {
		$("#wordGuess").append(" " + characterArray[i] + " ");
	}


	for (i = 0; i < wordString.length; i++) {
		//append "__" + space to div spaces section (for each character of the wordString)
		underscoreArray.push("___");
	}

	for (i = 0; i < wordString.length; i++) {
		//append "__" + space to div spaces section (for each character of the wordString)
		underscoreString = underscoreArray[i];
		$("#wordCharacters").append(underscoreString + " ");
	}
}











//Starts game with any key pressed
// document.onkeyup = function() {
// 	rageMan();
// }

//"New Game" button function to begin game
function rageMan() {
	console.log("new game is working");
}

//"Skip Word" button function to skip current word
function skipWord() {
	console.log("skip word is working");
}

//"About This Word" button function to direct to URL containing origin of word
function aboutThisWord() {
	console.log("about this word is working");
}



