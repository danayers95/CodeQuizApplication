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
        title: "Math.random() returns ____.",
        choices: ["a number between 1 and 100", "a number between 0 and 9", "a number between 1 and 9", "a number between 0 and 1"],
        answer: "a number between 0 and 1"
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

// Create new element for application 
var ulCreate = document.createElement("ul");

var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var questionsForQuiz = document.querySelector("#questionsForQuiz");
var timerStart = document.querySelector("#timerStart");

// Sets and holds interval time for application
var holdInterval = 0;

// Set seconds left to 15 seconds per question 
var secondsLeft = 76;

// Sets and holds penalty time if question is incorrect
var penalty = 10;



// Triggers timer for quiz
timerStart.addEventListener("click", function () {
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
        var listItem = document.createElement("listItem");
        listItem.textContent = newItem;
        questionsForQuiz.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}



// Create event to compare choices with the correct answer 
function compare(event) {
    var element = event.target;

    if (element.matches("listItem")) {

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

    // Calculate time remaining on quiz and replace it with the users score 
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsForQuiz.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsForQuiz.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsForQuiz.appendChild(createInput);

    

    var createSubmitBtn = document.createElement("button");
    createSubmitBtn.setAttribute("type", "submit");
    createSubmitBtn.setAttribute("id", "Submit");
    createSubmitBtn.textContent = "Submit";

    questionsForQuiz.appendChild(createSubmitBtn);

    // Use event listener to store initials/score in local storage
    createSubmitBtn.addEventListener("click", function () {
        
        var initials = createInput.value;

        if (initials === null) {

            console.log("No initials entered");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            localStorage.setItem("allScores", newScore);
            var newScore = JSON.stringify(allScores);
            
            
            window.location.replace("./highscore.html");
        }
    });

}