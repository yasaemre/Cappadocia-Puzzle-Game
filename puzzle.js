window.onload = function() {
        start();// when windows loads start() function is assigned to it.
        refresh();//when windows loads refresh() function is assigned to it.
        
    };


var puzzle = new Array(16); // An array object with 16 elements
var puzzleImg = new Array(16);// An array object holding 16 images
var puzzleSize = 16; // puzzle size
var number = 0; //to count the number of moves

/*
	This function counts the number of total clicks,
	As long as user clicks the boxes, number get incremented by one
	and display some messages to the player
*/
function clickCounter(){ 
	number ++;
	document.getElementById("clicks").innerHTML = number;

	switch (number){
		case 1:
			document.getElementById("message").innerHTML = "Good luck!";
			break;
		case 25:
			document.getElementById("message").innerHTML = "Keep trying!";
			break;
		case 50:
			document.getElementById("message").innerHTML = "You'll get there eventually!";
			break;
		case 75:
			document.getElementById("message").innerHTML = "Sooner or later... right?!";
			break;
		case 100:
			document.getElementById("message").innerHTML = "...Almost done?";
			break;
		case 150:
			document.getElementById("message").innerHTML = "Did you give up? :(";
			break;	
	}
}
/*
	This function shuffles the images
*/
function shuffle(){ 
	var count = 0; // counts

//creates a truly shuffled array with false values for all images
	for (var x = 0; x < puzzleImg.length; x++){
		puzzleImg[x] = false; 
		
	}
//as long as the count is less than puzzleSize, it shuffles the card
//with this while loop.
	while(count < puzzleSize){
		var random = Math.floor(Math.random() * 16);//takes a random value
		var index = random;
		var temp = puzzle[index];

		puzzle[index] = puzzle[count];
		puzzle[count] = temp;
		count++
	}
	refresh(); //whenever starts button clicked, refresh() is invoked 
}

//starts the puzzle by mixing the each square
function start(){ 
	var count = 0;
	
	while(count < puzzleSize){
		puzzleImg[count] = true;
		puzzle[count] = count;
		count++;
	}
	puzzle[15]="blank";
	refresh();
}
//refresh the page
function refresh(){ 
	var index = new Array(16);// new index variable
	var imgPath = 'images/'; //image path variable

//the loop go through 16 elements, 
	for(var i = 0; i < puzzleSize; i++){
		index[i] = document.getElementById(i);// gets image id in html file
		index[i].src = imgPath + puzzle[i] + ".jpg";// it assigns each image value to the source
	}
}

//If the value of current is 0 or negative, return 0
//with arguments[0] which is a array like obj having access to function
//starting from 0 
function errorZero(){ 
	if(arguments[0] < 0){
		return 0;
	}else {
		return arguments[0];
	}
}

//swaps the the cards. in here a basic swap technique is being used
//by creating temp variable
function swap(){
	var index, check, temp;//decleration of index, check, temp

	index = arguments[0];//arg 0 is index
	check = arguments[1];//arg 1 is check
	temp = puzzle[index];//temporary variable is assigned to value in puzzle[index]

	puzzle[index] = puzzle[check];//the value in puzzle[check] is assigned to puzzle[index]
	puzzle[check] = temp;//t

	refresh();
}

//swap the current index's picture (via move()) and the blank image if they are beside each other
//location of blank swap determined by moveUp, moveDown, moveLeft, moveRight
function swapBlank(){
	var current, toSwap;

	current = arguments[0];//current picture arg 0
	toSwap = arguments[1];//current pitcure arg 1

	// if the element is "blank", call swap function and
	//swap current to toSwap 
	if(puzzle[toSwap] == "blank"){
		swap(current, toSwap);
	}

	else {
	 return; 
	}

	// +1 everytime the blank img is swapped
	clickCounter(); 
}

//move() provides
function move(){
	var current = parseInt(arguments[0]);//parses string and return an integer of arg[0]
	var moveUp, moveDown, moveLeft, moveRight;//decleration of variables

	//Position tracker & error catching for moving the blank tile.
	//if the value coming from the arguments[0] and addition from -4, +4 and -1, 1 is greater than
	//zero, each move vaiable is assigned with arguments[0] with the return of errorZero
	moveUp = errorZero(current-4); 
	moveDown = errorZero(current+4);
	moveLeft = errorZero(current-1); 
	moveRight = errorZero(current +1);

	//if the current click of the mouse is equal to the id of the puzzle[image]
	if(current == puzzle[current]){
		puzzleImg[current] = true;
	}
	
	//swap the image with the blank
	swapBlank(current, moveUp); 
	swapBlank(current, moveDown);
	swapBlank(current, moveLeft); 
	swapBlank(current, moveRight);

}
