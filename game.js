//VARIABLES
let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: "Inside wich HTML element do we put the Javascript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer:3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello Wordl');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer:4
    },

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score'); 
const progressBarFull = document.getElementById('progressBarFull');

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

startGame();
