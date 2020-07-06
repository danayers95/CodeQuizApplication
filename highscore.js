 
// Declare variables for high score
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var backBtn = document.querySelector("#backbtn");

// Clear scores with event listener
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreive local stroage 
var totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores);

if (totalScores !== null) {

    for (var i = 0; i < totalScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = totalScores[i].initials + " " + totalScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Move to index page
backBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});