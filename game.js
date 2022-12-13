var buttonColors = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;
var score = 0;

// to start the game by pressing any key
// --> Desktop
$(document).keypress(function () {
  if (!gameStarted) {
    // if game is not started

    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// --> Mobile
$("#start").click(function () {
  if (!gameStarted) {
    // if game is not started

    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Store the id (color) of btns clicked in user clicked Pattern
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor + " was clicked");

  // play sound when clicked
  playSound(userChosenColor);
  // pressed animation when clicked
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// sequence of game
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNum];

  gamePattern.push(randomChosenColour);

  // flash animation at btns
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// Sound Function
function playSound(name) {
  var colorsAudio = new Audio("./assets/sounds/" + name + ".mp3");
  colorsAudio.play();
}

// add pressed effect when btn is cliked
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(() => {
    $(".btn").removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // high score & current score logic
      score += 1;
      // TODO
      // if(score > highscore) {
      //   highscore = score;
      //   $("#highscore").text(score);
      // }

      $("#highscore").text(score);
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    var wrongAudio = new Audio("./assets/sounds/wrong.mp3");
    wrongAudio.play();
    startover();
  }
}

// restart the game
function startover() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  score = 0;
}
