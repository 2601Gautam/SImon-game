// All 4 colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Randomly generated color pattern
var gamePattern = [];
// Colors clicked by the user
var userClickedPattern = [];
// Starting level
var level = 0;
var started = false;
var click_num = 0;

// User starts by pressing any key on the keyboard
$(document).keydown(function (event) {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

// Sequence generated randomly at each level
function nextSequence() {
  level++;
  $("#level-title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
}

// User clicks based on the random color that popped up
$(".btn").on("click", function () {
  userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);

  if (userChosenColour !== gamePattern[click_num]) {
    $("#level-title").html("Game Over, Press Any Key to Restart");
    playsound("wrong");
    started = false;
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  } else {
    click_num++;
    if (click_num === level) {
      click_num = 0;
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
});

// Button press animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Plays the sound associated with the given color
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
