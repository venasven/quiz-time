var startBtn = document.querySelector('.startBtn');
var headerEl = document.querySelector('h1');
var containerEl = document.querySelector('.container');
var endPageEl = document.querySelector('.end-page');
var timeLeftEl = document.querySelector('.timer');
var submitEl = document.querySelector('ul');



var score = 0;
var currentQuestion = 0;
var intervalId;
var timeLeft = 45;

var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

function displayQuestion(index) {
  var question = questions[index];
  containerEl.textContent = question.title;
  containerEl.classList.add('container');

  for (var i = 0; i < question.choices.length; i++) {
    var option = document.createElement('button');
    option.textContent = question.choices[i];
    option.addEventListener('click', answerQuestion);
    containerEl.appendChild(option);
  }
}

function answerQuestion() {
  if (this.innerHTML === questions[currentQuestion].answer) {
    score += 20;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestion++;

  if (currentQuestion >= questions.length || timeLeft === 0) {
    endPage();
    clearInterval(intervalId);
  } else {
    displayQuestion(currentQuestion);
  }
}


function endPage() {
  var finalScore = document.querySelector('.score');
  submitInitials();
  finalScore.textContent = ('Final Score: ' + score);
  endPageEl.removeAttribute('class', 'hide');
  containerEl.setAttribute('class', 'hide');
}

function startTimer() {
  intervalId = setInterval(function () {
    //updates the time
    timeLeft--;
    //render time
    timeLeftEl.textContent = 'Time Remaining: ' + timeLeft + ' second(s)';
    if (timeLeft === 0) {
      clearInterval(intervalId);
      endPage();
    }

  }, 1000);
}
function startQuiz() {
  headerEl.setAttribute('class', 'hide');
  containerEl.setAttribute('class', 'display');
  startBtn.setAttribute('class', 'hide');
  displayQuestion(currentQuestion);
  startTimer();
}

function submitInitials() {
  submitEl.innerHTML = '';
  var initialsInput = document.createElement('input');
  initialsInput.setAttribute('type', 'text');

  initialsInput.setAttribute('placeholder', 'Please enter your initials!');
  var submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.setAttribute('class', 'submitBtn')

  var allScores = JSON.parse(localStorage.getItem('allScores')) || [];

  submitButton.addEventListener('click', function () {
    var initials = initialsInput.value;
    var newScore = { initials: initials, score: score };
    allScores.push(newScore);
    localStorage.setItem('allScores', JSON.stringify(allScores));
    listAllScores();
  });

  var endPageP = document.querySelector('.submit');
  endPageP.innerHTML = '';
  endPageP.appendChild(initialsInput);
  endPageP.appendChild(submitButton);
}

startBtn.addEventListener('click', startQuiz);

function listAllScores() {
  var titleScore = document.querySelector('ul');
  titleScore.textContent = 'High Scores: ';

  titleScore.classList.add('score-title');

  var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
  allScores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < allScores.length; i++) {
    var scoreLi = document.createElement('li');
    scoreLi.textContent = allScores[i].initials + ': ' + allScores[i].score;
    document.querySelector('.high-scores').appendChild(scoreLi);
  }
}

listAllScores();