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
