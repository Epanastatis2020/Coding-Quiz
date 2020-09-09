// Declaring global variables
var mainForm = document.getElementById("mainForm");
var screenContainerEl = document.getElementById("screenContainer");
var viewHighScoreEl = document.getElementById("highScoreLink");
var btnHome = document.getElementById("homeBtn");
var highScoreScreenEl = document.getElementById("highScoreScreen");
var highScoreListEl = document.getElementById("highScoreList");
var startBtnEl = document.getElementById("startBtn");
var clearHighScoresBtnEl = document.getElementById("clearHighScoresBtn");
var timerEl = document.getElementById("timerP");
var timerDisplayEl = document.getElementById("timerDisplay");
var olHolderEl = document.createElement("ol");
var olHighScoreHolderEl = document.createElement("ol");
var currentResultEl = document.getElementById("questionFeedBack");
var spacerEl = document.getElementById("blankColumn");
var countDownTimer = 30;
var questionIndex = 0;
var quizScore = 0;
var totalScore = 0;

//Adding event listeners
viewHighScoreEl.addEventListener("click",viewHighScores);
startBtnEl.addEventListener("click", startTheTimer);
olHolderEl.addEventListener("click", answerChecker);
clearHighScoresBtnEl.addEventListener("click",clearHighScores);

//Making home button reload page
btnHome.addEventListener("click", event => {
    location.reload();
});     


//Countdown timer
function startTheTimer(event) {
  event.preventDefault();
    showQuestion(questionIndex);
    $( "#timerP" ).show();
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
    debugger;
    event.preventDefault();
      
    var inputEl = document.getElementById("inputEl");
    var playerName = inputEl.value.trim();
  
    if (playerName === "") {
      return;
    }
    var currentPlayerScore = {
      name: playerName,
      score: totalScore
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
    $( "#blankColumn" ).show();
    $( "#questionFeedBack" ).show();
  
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
  
  //code that checks answers and processes
  function answerChecker(event){
    var choice = event.target;
  
    //event delegate - if user has clicked on a button, process answer
    if (choice.matches("button")) {
  
      //answer is correct.  bump the score up by one, increase timer by 5 seconds, return a correct message
      if (choice.parentElement.getAttribute("data-index") == questions[questionIndex].correctAnswer){
        quizScore++;
        countDownTimer = countDownTimer + 4;
        currentResultEl.textContent = "Correct!";
        currentResultEl.setAttribute("class", "float-right alert alert-success");
      }
      //answer is incorrect - deduct 5 seconds from teh timer, display incorrect message.
      else {
        countDownTimer = countDownTimer - 4;
        if (countDownTimer < 0) {
          countDownTimer = 0;
        }
        currentResultEl.textContent = "Incorrect!";
        currentResultEl.setAttribute("class", "float-right alert alert-danger");
      }
  
      questionIndex++;
  
      if (questionIndex == questions.length){
        //call ending function here        
        finishGame();
      }
      else
      {
        //or, if havent reached the end of questions, ask the next one
        showQuestion(questionIndex);      
      }
    }
  }
  
  //finish the game
  function finishGame(){
    screenContainerEl.textContent = "";
    currentResultEl.textContent = "";
    currentResultEl.setAttribute("class", "alert alert-light");
    $( "#blankColumn" ).hide();
    $( "#questionFeedBack" ).hide();
    timerEl.style.display = "none";
  
    totalScore = (2*quizScore) + countDownTimer;

    //new h1
    var endGameH1El = document.createElement("h1");
    endGameH1El.setAttribute("id", "endGameH1El");
    endGameH1El.setAttribute("class", "display-4");
    endGameH1El.textContent = "End of game!"
    screenContainerEl.appendChild(endGameH1El);
  
    //p tag that shows your final score 
    var endGamePEl = document.createElement("p");
    endGamePEl.setAttribute("id", "endGameP");
    endGamePEl.textContent = "Your final score is: " + totalScore;
    screenContainerEl.appendChild(endGamePEl);
    
    //label for the name input
    var newLabelEl = document.createElement("label");
    newLabelEl.setAttribute("id", "inputLabelEl");
    newLabelEl.setAttribute("for", "inputEl");
    newLabelEl.textContent = "Enter your name or initials:     ";
    screenContainerEl.appendChild(newLabelEl);
  
    //Input element to enter name
    var nameInputEl = document.createElement("input");
    nameInputEl.setAttribute("type", "text");
    nameInputEl.setAttribute("id", "inputEl");
    nameInputEl.setAttribute("class", "input-group-prepend");
    nameInputEl.textContent = "";
    screenContainerEl.appendChild(nameInputEl);
  
    //Submit button, which will record high scores.
    var highScoreSaveBtnEl = document.createElement("button");
    highScoreSaveBtnEl.setAttribute("id", "startBtn");
    highScoreSaveBtnEl.setAttribute("class", "btn btn-primary");
    highScoreSaveBtnEl.textContent = "Save";
    
    highScoreSaveBtnEl.addEventListener("click",saveHighScores);
    screenContainerEl.appendChild(highScoreSaveBtnEl);
  }