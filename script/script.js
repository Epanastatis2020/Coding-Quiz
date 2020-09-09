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
var currentResultEl = document.getElementById("questionFeedBack");
var countDownTimer = 60;
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
    if ($( "#highScoreScreen" ).is(":hidden")){
        $( "#highScoreScreen" ).show();
        $( "#screenContainer" ).hide();
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
        $( "#screenContainer" ).show();
        $( "#highScoreScreen" ).hide();
      viewHighScoreEl.textContent = "View High Scores";
    }
  }

  //save the high scores
function saveHighScores(event){
    event.preventDefault();
      
    var inputEl = document.getElementById("inputEl");
    var playerName = inputEl.value.trim();
  
    if (playerName === "") {
      return;
    }
    var currentPlayerScore = {
      name: playerName,
      score: quizScore
    };
  
    var scores = JSON.parse(window.localStorage.getItem('scores'));
    if (scores === null) {
      scores = [];
    } 
    scores.push(currentPlayerScore);
    localStorage.setItem("scores", JSON.stringify(scores));
    viewHighScores(event);
  }
  
  //clear the high scores
  function clearHighScores(event) {
    event.preventDefault();
    localStorage.removeItem('scores')
    olHighScoreHolderEl.textContent = "";
  }
  
  //code to show the questions
  function showQuestion(questionIndex){
    screenContainerEl.textContent = "";
    olHolderEl.textContent = "";
  
    //get the question and array of answers at the question index
    var userQuestion = questions[questionIndex].questionTitle;
    var possibleAnswers = questions[questionIndex].answerChoices;
    //add the question to the start screen div
    screenContainerEl.textContent = userQuestion;
    screenContainerEl.appendChild(olHolderEl);
  
    //Add the possible answers to the screen for each question
    possibleAnswers.forEach(function (newListItem, arrayIndex) {
      var answerRow = document.createElement("li");
      answerRow.setAttribute("data-index", arrayIndex)
      answerRow.innerHTML = ' <button id="answerBtn" class="btn btn-primary">' + newListItem + '</button>';
      olHolderEl.appendChild(answerRow);
    })
  }
  
