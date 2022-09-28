// How the game works
// User clicks on any box in the grid
// Computer shows number or blank of surrounding boxes
// If user clicks on bug, user loses
// If user does not click on bug, user wins

// 1. Define all the variables needed
var board = []; // 2D array
var boardRows = 8;
var boardColumns = 8;

var numberOfBugs = 5;
var bugsLocation = []; // record array of bugs' location: 2-2, 3-4, etc.

var boxesClicked = 0; // goal: to click all boxes except the ones with bugs

var frogEmojiEnabled = false; // user clicks flag: true and vice versa
var gameOver = false;

// 2. Enable startGame function
window.onload = function() {
  startGame ();
}

// 3. Create a startGame function
function startGame () {
  document.getElementById("number-of-bugs").innerText = numberOfBugs;
  //add event listener for clickBox
  console.log(document.getElementById("frog-button"));
  document.getElementById("frog-button").addEventListener("click", clickFrogEmoji);
  //add bugs
  addBugs();

  // Add rows (r) and columns (c) to board
  for (let r=0; r < boardRows; r +=1){
    let row = [];
    for (let c=0; c < boardColumns; c +=1){
      // Tag a box to <div>
      let box = document.createElement("div");
      // Record <div> by r & c position aka 0-0, 0-1, etc.
      box.id = r.toString() + "-" + c.toString();
      // Make boxs clickable
      box.addEventListener("click", clickBox)
      // Place box inside board
      document.getElementById("board").append(box)
      // Push box
      row.push(box)
    }
    //push row with box inside
    board.push(row)
  }
  console.log ("Show div box position by row & column")
  console.log (board)
}

// 4. Create a function that listens to box being clicked
function clickBox(){

  let box = this;
  if (frogEmojiEnabled){
    if (box.innerText == ""){
        box.innerText = "🐸";
    }
    else if (box.innerText == "🐸"){
       box.innerText = "";
    }
    return;
  }
  // 7. Inform player that he/she lost if he/she clicks on a bug
  if (bugsLocation.includes(box.id)){
    showBugs();
    setTimeout(function(){
      if (
        !alert("Game over: You let bugs into your garden! Try again?")
      ){window.location.reload()}
   }, 100)
    // alert ("Game over: You let bugs into your garden! Click OK to try again.");
    // gameOver = true;
    // if (!alert("Game over: You let bugs into your garden! Click OK to try again.")){window.location.reload();};
    // return;
  }

  // 9. Call show neighbouring bug function
  // Split current 0-0 into new array
  let location = box.id.split("-");
  // ParseInt to convert into integer
  let r = parseInt(location[0])
  let c = parseInt(location[1])
  showBoxes(r, c);
  }

// 5. Create a function that notes if frog emoji is enabled
function clickFrogEmoji(){
  if (frogEmojiEnabled){
    frogEmojiEnabled = false;
    document.getElementById("frog-button").style.backgroundColor = "#ADD4C0";
  }
  else {frogEmojiEnabled = true;
    document.getElementById("frog-button").style.backgroundColor = "#00612F";
  };
}

// 6. Create a function that adds bugs to board
function addBugs(){
  while (numberOfBugs > 0){
  let bugCellR = Math.floor(Math.random() * boardRows);
  let bugCellC = Math.floor(Math.random() * boardColumns);
  let setLocation = bugCellR.toString() + "-" + bugCellC.toString();
  if (!bugsLocation.includes(setLocation)){
    bugsLocation.push(setLocation);
    numberOfBugs -=1;
    }
  }
  console.log ("Show where bugs are")
  console.log (bugsLocation)
}

// 8. Create a function that shows where the bugs are
function showBugs(){
  for (let r = 0; r < boardRows; r +=1){
    for (let c = 0; c < boardColumns; c +=1){
        let box = board[r][c];
        if (bugsLocation.includes(box.id)){
          box.innerText = "🐛";
          box.style.backgroundColor = "#866447";
        }
      }
    }
  }

// // 10. Create a function that shows neighbouring boxes
function showBoxes (r, c){
  if (r <0 || r >= boardRows || c < 0 || c>= boardColumns){
    return;
  }

  // Prevent double checking neighbouring boxes
  if (board[r][c].classList.contains("box-clicked")){
    return;
  }

  // Show neighbouring boxes w/o number
  board[r][c].classList.add("box-clicked")

  let neighbouringBoxes = 0;

  // On top of bug
  neighbouringBoxes += checkBox(r-1, c-1);
  neighbouringBoxes += checkBox(r-1, c);
  neighbouringBoxes += checkBox(r-1, c+1);
  // Same row as bug
  neighbouringBoxes += checkBox(r, c-1)
  neighbouringBoxes += checkBox(r, c+1);
  // Below bug
  neighbouringBoxes += checkBox(r+1, c-1)
  neighbouringBoxes += checkBox(r+1, c)
  neighbouringBoxes += checkBox(r+1, c+1);

  if (neighbouringBoxes > 0){
    board[r][c].innerText = neighbouringBoxes;
  }
}

function checkBox(r, c){
  if (r < 0 || r >= boardRows || c < 0 || c >= boardColumns){
    return 0;
  }
  if (bugsLocation.includes(r.toString()+ "-" + c.toString())){
    return 1;
  }
  return 0;
}