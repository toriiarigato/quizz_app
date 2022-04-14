//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score'); 
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

//VARIABLES
let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let level = localStorage.getItem('level') || [];
let selectedQuizz = "";

if(level === 'easy'){
  selectedQuizz = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
}else if (level === 'medium'){
  selectedQuizz = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
}else if (level === 'hard'){
  selectedQuizz = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple";
}else{
  selectedQuizz = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
}
fetch(selectedQuizz)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 10) + 1;
      answerChoices.splice(
        formattedQuestion.answer -1, 
        0,
        loadedQuestion.correct_answer
      );
      
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index+1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })
  .catch (err => {
    console.log(err);
  });

/**
 * Fonction qui lance la 1ère question et qui appelle la fonction getNewQuestion
 * Remet les compteurs à 0
 * Function who start the game and call the getNewQuestion function
 * Put the counters to zero
 */
startGame= () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  // console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};

getNewQuestion = () => {

  //Si le nombre de question restante ou que le compteur de question tombent à zéro le jour est redirigé vers la page de fin
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
    localStorage.setItem('mostRecentScore', score );
    //go to the end page
    return window.location.assign('/end.html');
  };

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
  //update the progressBarFull
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION)*100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true; 
};

choices.forEach(choice => {
  choice.addEventListener("click" ,e => {
    // console.log(e.target);
    if(!acceptingAnswers) return;

    acceptingAnswers = false; 
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = 
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      if(classToApply === 'correct'){
        incrementScore(CORRECT_BONUS);
      }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout ( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

// startGame();
