/*
 * A list that holds all of your cards
 */
const listOfIcon = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const icons = [...listOfIcon, ...listOfIcon] // Select Cards from class deck
const cardCollection = document.querySelector(".deck");
const starContainer = document.querySelectorAll(".stars");

//Empty array to store openedcards
let openedCards = [];

//Empty array to store matchedCards
let matchedCards = [];

let moves = 0;
let firstClick = true;
let minutes = "";
let seconds = "";
let totalTime = 0;
let incrementer = "";

let timer = document.querySelectorAll(".timer");
const secondCounter = document.querySelector(".seconds");
const minuteCounter = document.querySelector(".minutes");

const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const playAgainMessage = document.querySelector(".message .play-again");

const movesContainer = document.querySelector(".moves");


/*
 *   - shuffle the list of cards using the provided "shuffle" method below
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


/*
 * Initialize the game
 */

function startGame() {
  // Shuffle the current `iconsList`
  shuffle(icons);

  /* Create the Cards dynamically
   *   - loop through each card and create its HTML
   *- add each card's HTML to the page
   */
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardCollection.appendChild(card);

    /* Shuffle the current `iconsList`
     *when clicked
     */
    clicked(card);

  }

}

// function clicked
function clicked(card) {

  card.addEventListener("click", function () {
    console.log(card);
    if (card.classList.contains("open")) {
      card.classList.add("disable");
    } else {

      moves += 1;
      movesContainer.innerHTML = moves;
      card.classList.add("disable");
      const latestCard = this;
      const lastCard = openedCards[0];

      $(latestCard).removeClass("unmatch");
      $(lastCard).removeClass("unmatch");

      //Start the timer on first click
      if (firstClick) {
        startTimer();
        firstClick = false;
      }

      // Comparing existing opened cards
      if (openedCards.length === 1) {

        card.classList.add("open", "show");
        openedCards.push(this);

        compare(latestCard, lastCard);

      } else {
        latestCard.classList.add("open", "show");
        openedCards.push(this);

      }
    }
  });

}

/*
 * Compare the cards function
 */

function compare(latestCard, lastCard) {

  if (latestCard.innerHTML === lastCard.innerHTML) {

    //Matched Cards

    $(latestCard).addClass("match");
    $(lastCard).addClass("match");

    matchedCards.push(latestCard, lastCard);

    //Reset openCards array
    openedCards = [];

    //calling gameOver function
    gameOver();

  } else {

    setTimeout(function () {
      $(latestCard).removeClass("open", "show");
      $(latestCard).addClass("unmatch");

      $(lastCard).removeClass("open", "show");
      $(lastCard).addClass("unmatch");
      $(latestCard).removeClass("disable");
      $(lastCard).removeClass("disable");

    }, 500);

    //Reset openCards array
    openedCards = [];

  }

  // call addMoves
  addMoves();
  // call rating
  rating();

}

/*
 * Game over function
 */

function gameOver() {

  if (matchedCards.length === icons.length) {

    setTimeout(function () {
      for (i = 0; i < timer.length; i++) {
        let totalTime = timer[i].innerHTML;
      }

      totalTime = document.getElementsByClassName("totalTime").innerHTML;
      for (i = 0; i < starContainer.length; i++) {

        let ratingStar = starContainer[i].innerHTML;
      }

      ratingStar = document.getElementsByClassName(".total_rate").innerHTML;
      for (var i = 0; i < movesContainer.length; i++) {
        moves = movesContainer[i].innerHTML;
      }

      moves = document.getElementsByClassName(".total_moves").innerHTML;
      clearInterval(incrementer);
      $(".message").show().fadeIn();
      $(cardCollection).hide();

    }, 500);

  }

}



/*
 * addMoves function
 */
function addMoves() {
  for (i = movesContainer.length - 1; i >= 0; i--) {
    moves = movesContainer[i].innerHTML;
  }

  movesContainer.innerHTML = moves;

  rating();
}


/*
 * Timer Function
 */
function startTimer() {

  // Start Incrementer
  incrementer = setInterval(function () {

    for (var i = 0; i < timer.length; i++) {
      timer[i].innerHTML =
        `<i class="fa fa-clock-o"></i> ` + minutes + " : " + seconds;

    }

    // Add totalTime by 1
    totalTime += 1;

    // Convert Total Time to minutes:seconds
    calculateTime(totalTime);

    // Change the current time values
    secondCounter.innerHTML = seconds;
    minuteCounter.innerHTML = minutes;

    if (seconds == 0) {
      seconds++;

    } else if (seconds > 59) {
      minutes++;

    } else {
      print;
    }

  }, 1000);

}

/*
 * Calculate Time
 */
function calculateTime(totalTime) {
  minutes = Math.floor((totalTime / 60) % 60);
  seconds = totalTime % 60;
}

/*
 * rating function
 */
function rating() {

  for (i = starContainer.length - 1; i >= 0; i--) {


    if (moves >= 0 && moves <= 6) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 6 && moves <= 12) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 12 && moves <= 18) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 18 && moves <= 24) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 24 && moves <= 30) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>`;

    } else {
      starContainer[i].innerHTML = "";

      // Remove all cards
      cardCollection.innerHTML = "";

      // Call 'startGame' function to start a new game
      startGame();

      // Reset matched cards
      matchedCards = [];

      openedCards = [];

      // Reset the moves
      moves = 0;

      // Stop Timer
      stopTimer();

      //show gameover
      $(".gameover").show().fadeIn();

      cardCollection.innerHTML = "";


    }

  }

}


/*
 * Play Again
 */
playAgain.addEventListener("click", function () {
  $(cardCollection).show().fadeIn();
  $(".message").hide();

  // Remove all cards
  cardCollection.innerHTML = "";

  // Call 'startGame' function to start a new game
  startGame();

  // Reset matched cards
  matchedCards = [];

  openedCards = [];

  // Reset the moves
  moves = 0;

  for (i = 0; i < movesContainer.length; i++) {
    movesContainer[i].innerHTML = moves;
  }

  //Reset Timer
  minuteCounter.innerHTML = "00";
  secondCounter.innerHTML = "00";
  stopTimer();
  firstClick = true;
  totalTime = 0;
  minutes = 0;
  seconds = 0;

  for (i = 0; i < starContainer.length; i++) {

    starContainer[i].innerHTML =
      `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
  }

});


/*
 * Restart the game
 */

const reset = document.querySelectorAll(".restart");
for (var i = 0; i < reset.length; i++) {
  reset[i].addEventListener("click", function () {
    $(cardCollection).show().fadeIn();
    $(".message").hide();
    $(".gameover").hide();


    // Remove all cards
    cardCollection.innerHTML = "";

    // Call 'startGame' function to start a new game
    startGame();


    // Reset matched cards
    matchedCards = [];

    openedCards = [];

    // Reset the moves
    moves = 0;

    for (var i = 0; i < movesContainer.length; i++) {
      movesContainer[i].innerHTML = moves;
    }

    //Reset Timer
    minuteCounter.innerHTML = "00";
    secondCounter.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    minutes = 0;
    seconds = 0;

    //Reset ratingStar
    for (i = 0; i < starContainer.length; i++) {
      starContainer[i].innerHTML =
        `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
    }
  })

};


/*
 * Stop Timer
 */
function stopTimer() {
  // Stop Timer
  clearInterval(incrementer);
}


//Start game for the first time

startGame();
