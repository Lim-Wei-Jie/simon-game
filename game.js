var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// game sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("#level-title").text("Level " + level);
}


// user click sequence
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer([userClickedPattern.length - 1]); // checking for the current colour clicked by user
})


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    },100)
}

// start game 

var level = 0;
var gameState = false;

// gameState == false

$(document).keydown(function (event) {
    if (!gameState) {
        nextSequence();
        gameState = true;
    }
})

// gameState == true

/*
function checkAnswer(currentLevel) {
    current level is the colour that the user just clicked
    if the user not done clicking all the colours {
        if current colour is correct {
            nothing happens
        } else {
            game over
        }
    } else if user done {
        nextSequence();
        userClickedPattern = [];
    }
}
*/

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        // console.log("success");

        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }

    } else {
        // console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200)

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    }

}

// restart game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameState = false;
}