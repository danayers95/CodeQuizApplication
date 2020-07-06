// Create questions for quiz via an array 
var questions = [
    {
        title: "What does JS stand for?",
        choices: ["JqueryScript", "JumboSandwich", "JavaString", "Javascript"],
        answer: "Javascript"
    },
    {
        title: "When using Javascript, what would the name be for a container that stores values?",
        choices: ["Variable", "Array", "String", "Object"],
        answer: "Array"
    },
    {
        title: "What is the purpose of a string in Javascript?",
        choices: ["Tying shoes", "Randomizing a group of images", "Securing the code in the javascript file", "Storing and manipulating text"],
        answer: "Storing and manipulating text"
    },
    {
        title: "How would one link an external javascript file to an html file?",
        choices: ["link rel=", "script src=", "div id=", "script rel="],
        answer: "script src="
    },
    {
        title: "What is the main purpose of a Javascript file in web-development?",
        choices: ["Programs the behavior of the web page", "Specifies the layout of the web page", "Defines the content of a web page", "Specifies the color and margins of a page"],
        answer: "Programs the behavior of the web page"
    },

];

// Declare variables for the quiz
var score = 0;
var questionIndex = 0;
var ulCreate = document.createElement("ul");
var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var questionsForQuiz = document.querySelector("#questionsForQuiz");
var timer = document.querySelector("#timerStart");
var holdInterval = 0;
var secondsLeft = 76;
var penalty = 10;



// Triggers timer for quiz
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finishUp();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Generates questions
function render(questionIndex) {
    // Clear existing data for quiz
    questionsForQuiz.innerHTML = "";
    ulCreate.innerHTML = "";
    // loop through all provided info in an array 
    for (var i = 0; i < questions.length; i++) {
        // Append question title
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsForQuiz.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsForQuiz.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}



// Create event to compare choices 
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    // Determines which question the user starts on
    questionIndex++;

    if (questionIndex >= questions.length) {
        finishUp();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsForQuiz.appendChild(createDiv);

}

// finishUp function appends the last page
function finishUp() {
    currentTime.innerHTML = "";
    questionsForQuiz.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Finished!"

    questionsForQuiz.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsForQuiz.appendChild(createP);

    // Calculates remaining time
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsForQuiz.appendChild(createP2);
    }


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsForQuiz.appendChild(createInput);

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsForQuiz.appendChild(createLabel);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsForQuiz.appendChild(createSubmit);

    // Use event listener to store initials/score in local storage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No initials entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var totalScores = localStorage.getItem("totalScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(finalScore);
            localStorage.setItem("totalScores", newScore);
            var newScore = JSON.stringify(totalScores);
            window.location.replace("./highscore.html");
        }
    });

}