const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScore')) || [];
const MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("ta mère la pute");
  e.preventDefault();

  const score = {
    score:mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a,b) => {
    return b.score - a.score;
  });

  localStorage.setItem('highScore', JSON.stringify(highScores));

  highScores.splice(5); 
};