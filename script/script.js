var mainForm = document.getElementById("mainForm");
var screenContainerEl = document.getElementById("screenContainer");
var viewHighScoreEl = document.getElementById("highScoreLink");
var highScoreScreenEl = document.getElementById("highScoreScreen");
var highScoreListEl = document.getElementById("highScoreList");
var startBtnEl = document.getElementById("startBtn");
var clearHighScoresBtnEl = document.getElementById("clearHighScoresBtn");
var timerEl = document.getElementById("timerP");
var timerDisplayEl = document.getElementById("timerDisplay");
var olHolderEl = document.createElement("ol");
var olHighScoreHolderEl = document.createElement("ol");
var countDownTimer = 30;
var questionIndex = 0;
var quizScore = 0;

viewHighScoreEl.addEventListener("click",viewHighScores);
startBtnEl.addEventListener("click", startTheTimer);    
olHolderEl.addEventListener("click", answerChecker);
clearHighScoresBtnEl.addEventListener("click",clearHighScores); 

//Countdown timer
function startTheTimer(event) {
  event.preventDefault();
    showQuestion(questionIndex);
    var timerInterval = setInterval(function() {
      countDownTimer--;
      timerDisplayEl.textContent =countDownTimer + " seconds left";    
      if(countDownTimer <= 0) {
        finishGame()
        clearInterval(timerInterval);
      }   
    }, 1000);
}

//View high scores.  Hide the main quiz screen and show the high score 
//screen and scores.
function viewHighScores(event){
    event.preventDefault();
    if (highScoreScreenEl.classList.contains("d-none")){
      highScoreScreenEl.setAttribute("class","d-block");
      viewHighScoreEl.textContent = "Hide High Scores";
      olHighScoreHolderEl.textContent = "";
      highScoreListEl.appendChild(olHighScoreHolderEl);
      var highScores = JSON.parse(window.localStorage.getItem('scores'));    
      highScores.sort(function(a, b){return b.score - a.score});
      for (i = 0; i < highScores.length; i++) {
        var highScoreRow = document.createElement("li");
        highScoreRow.setAttribute("class","highScoreListItem");
        highScoreRow.textContent = highScores[i].score + " - " + highScores[i].name;
  //      highScoreListEl.appendChild(olHighScoreHolderEl);
        olHighScoreHolderEl.appendChild(highScoreRow);
      }
    }
    else {
      resultEl.setAttribute("class","results show");
      screenContainerEl.setAttribute("class","show");
      highScoreScreenEl.setAttribute("class","hide");
      viewHighScoreEl.textContent = "View High Scores";
    }
  }