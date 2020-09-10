// Declaring global variables
let mainContainerEl = $("#mainContainer")[0];
let viewHighScoreEl = $("#highScoreLink")[0];
let btnHome = $("#homeBtn")[0];
let highScoreScreenEl = $("#highScoreScreen")[0];
let highScoreListEl = $("#highScoreList")[0];
let startBtnEl = $("#startBtn")[0];
let clearHighScoresBtnEl = $("#clearHighScoresBtn")[0];
let timerEl = $("#timer")[0];
let timerDisplayEl = $("#timerDisplay")[0];
let olHolderEl = document.createElement("ol");
let olHighScoreHolderEl = document.createElement("ol");
let currentResultEl = $("#questionFeedBack")[0];
let spacerEl = $("#blankColumn")[0];
let countDownTimer = 30;
let quizArrayIndex = 0;
let quizScore = 0;
let totalScore = 0;

//Adding event listeners
viewHighScoreEl.addEventListener("click",viewHighScores);
startBtnEl.addEventListener("click", startTheTimer);
olHolderEl.addEventListener("click", answerChecker);
clearHighScoresBtnEl.addEventListener("click",clearHighScores);

//Making home button reload page
btnHome.addEventListener("click", event => {
    location.reload();
});     


//Function for the Countdown timer
function startTheTimer(event) {
  event.preventDefault();
    showQuestion(quizArrayIndex);
    $( "#timer" ).show();
    let timerInterval = setInterval(function() {
      countDownTimer--;
      timerDisplayEl.textContent =countDownTimer + " seconds left";    
      if(countDownTimer <= 0) {
        finishGame()
        clearInterval(timerInterval);
      }   
    }, 1000);
}

//Function managing the High Scores screen
function viewHighScores(event){
    event.preventDefault();
    if ($( "#highScoreScreen" ).is(":hidden")){
        $( "#highScoreScreen" ).show();
        $( "#mainContainer" ).hide();
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
        $( "#mainContainer" ).show();
        $( "#highScoreScreen" ).hide();
      viewHighScoreEl.textContent = "View High Scores";
    }
  }

  //save the high scores
function saveHighScores(event){
    event.preventDefault();
      
    let inputEl = document.getElementById("inputEl");
    let playerName = inputEl.value.trim();
  
    if (playerName === "") {
      return;
    }
    let currentPlayerScore = {
      name: playerName,
      score: totalScore
    };
  
    let scores = JSON.parse(window.localStorage.getItem('scores'));
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
  function showQuestion(quizArrayIndex){
    mainContainerEl.textContent = "";
    olHolderEl.textContent = "";
    $( "#blankColumn" ).show();
    $( "#questionFeedBack" ).show();
  
    //get the question and array of answers at the question index
    let userQuestion = quizArray[quizArrayIndex].questionTitle;
    let possibleAnswers = quizArray[quizArrayIndex].answerChoices;
    //add the question to the start screen div
    mainContainerEl.textContent = userQuestion;
    mainContainerEl.appendChild(olHolderEl);
  
    //Add the possible answers to the screen for each question
    possibleAnswers.forEach(function (newListItem, arrayIndex) {
      let answerRow = document.createElement("li");
      answerRow.setAttribute("data-index", arrayIndex)
      answerRow.innerHTML = ' <button id="answerBtn" class="btn btn-primary">' + newListItem + '</button>';
      olHolderEl.appendChild(answerRow);
    })
  }
  
  //code that checks answers and processes
  function answerChecker(event){
    const choice = event.target;
  
    //event delegate - if user has clicked on a button, process answer
    if (choice.matches("button")) {
  
      //answer is correct.  bump the score up by one, increase timer by 5 seconds, return a correct message
      if (choice.parentElement.getAttribute("data-index") == quizArray[quizArrayIndex].correctAnswer){
        quizScore++;
        countDownTimer = countDownTimer + 4;
        currentResultEl.textContent = "Correct!";
        currentResultEl.setAttribute("class", "float-right alert alert-success");
      }
      //answer is incorrect - deduct 5 seconds from the timer, display incorrect message.
      else {
        countDownTimer = countDownTimer - 4;
        if (countDownTimer < 0) {
          countDownTimer = 0;
        }
        currentResultEl.textContent = "Incorrect!";
        currentResultEl.setAttribute("class", "float-right alert alert-danger");
      }
  
      quizArrayIndex++;
  
      if (quizArrayIndex == quizArray.length){
        //call ending function here        
        finishGame();
      }
      else
      {
        //or, if havent reached the end of questions, ask the next one
        showQuestion(quizArrayIndex);      
      }
    }
  }
  
  //finish the game
  function finishGame(){
    mainContainerEl.textContent = "";
    currentResultEl.textContent = "";
    currentResultEl.setAttribute("class", "alert alert-light");
    $( "#blankColumn" ).hide();
    $( "#questionFeedBack" ).hide();
    timerEl.style.display = "none";
  
    totalScore = (2*quizScore) + countDownTimer;

    //new h1
    let endGameH1El = document.createElement("h1");
    endGameH1El.setAttribute("id", "endGameH1El");
    endGameH1El.setAttribute("class", "display-4");
    endGameH1El.textContent = "End of game!"
    mainContainerEl.appendChild(endGameH1El);
  
    //p tag that shows your final score 
    let endGamePEl = document.createElement("p");
    endGamePEl.setAttribute("id", "endGameP");
    endGamePEl.textContent = "Your final score is: " + totalScore;
    mainContainerEl.appendChild(endGamePEl);
    
    //label for the name input
    let newLabelEl = document.createElement("label");
    newLabelEl.setAttribute("id", "inputLabelEl");
    newLabelEl.setAttribute("for", "inputEl");
    newLabelEl.textContent = "Enter your name or initials:     ";
    mainContainerEl.appendChild(newLabelEl);
  
    //Input element to enter name
    let nameInputEl = document.createElement("input");
    nameInputEl.setAttribute("type", "text");
    nameInputEl.setAttribute("id", "inputEl");
    nameInputEl.setAttribute("class", "input-group-prepend");
    nameInputEl.textContent = "";
    mainContainerEl.appendChild(nameInputEl);
  
    //Submit button, which will record high scores.
    let highScoreSaveBtnEl = document.createElement("button");
    highScoreSaveBtnEl.setAttribute("id", "startBtn");
    highScoreSaveBtnEl.setAttribute("class", "btn btn-primary");
    highScoreSaveBtnEl.textContent = "Save";
    
    highScoreSaveBtnEl.addEventListener("click",saveHighScores);
    mainContainerEl.appendChild(highScoreSaveBtnEl);
  }

  //array with questions, answers, correct answers
    const quizArray = [
  {
      questionTitle: "What does HTML stand for?",
      answerChoices:["Home Tool Marking Language" , "Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Hypertext Machine Language"],
      correctAnswer: 1
  },
  {
      questionTitle: "What does CSS stand for?",
      answerChoices:["Cascasing Short Sheets" , "Concatenating Style Sheet", "Cascading Style Sheets", "Chicken Sour Sausages"],
      correctAnswer: 2
  },
  {
      questionTitle: "What type of language is Javascript?",
      answerChoices:["Indonesian" , "Markup language", "Styling language", "Programming language"],
      correctAnswer: 3
  },
  {
      questionTitle: "What is meant when something is concatenated?",
      answerChoices:["It is split into its component parts" , "It is combined with something", "It changes from array to string", "It is encased in concates"],
      correctAnswer: 1
  },
  {
      questionTitle: "What number refers to the first object in an array?",
      answerChoices:["1" , "One", "0", "1st"],
      correctAnswer: 2
  },
  {
      questionTitle: "What type of information should NOT be stored locally?",
      answerChoices:["Client IP" , "Geolocation", "Password information", "Incognito browsing history"],
      correctAnswer: 2
  },
  {
      questionTitle: "What is Bootstrap?",
      answerChoices:["A library of self-help books" , "A website which teaches you how to make shoes", "A back end toolkit", "A front end toolkit"],
      correctAnswer: 3
  },
  {
      questionTitle: "How would you incorporate Bootstrap into a project?",
      answerChoices:["You call up and order the parts you want" , "You need to pay a subscription, and then download their templates", "You link to their CDN in your head tag", "You link to their CDN in your body tag"],
      correctAnswer: 2
  },
  {
      questionTitle: "What is jQuery?",
      answerChoices:["A Javascript library" , "A means of simplifying Javascript to make coding easier and quicker", "A free resource", "All of the above"],
      correctAnswer: 3
  },
  {
      questionTitle: "Which of the below symbols characterise commenting in Javascript?",
      answerChoices:["!--" , "!!", "/*", "//"],
      correctAnswer: 3
  },
  {
      questionTitle: "How would you go about calling a function?",
      answerChoices:["Function, here!" , "function[]", "function()", "function:(active)"],
      correctAnswer: 2
  },
  {
      questionTitle: "What characterises responsive web design?",
      answerChoices:["The web page will respond to you when you ask it things" , "The web page changes its layout depending on your device screen size", "The website is available in many languages", "The web page was designed in response to customer requests"],
      correctAnswer: 1
  },
  {
      questionTitle: "What does API stand for?",
      answerChoices:["Access Point Interface" , "Application Point Interchange", "Application Programming Interface", "Aggressive Police Intervention"],
      correctAnswer: 2
  }]