const easyLevel = document.getElementById("easyLevel");
const mediumLevel = document.getElementById("mediumLevel");
const hardLevel = document.getElementById("hardLevel");


easyLevel.addEventListener("click", () => {
  localStorage.setItem('level', 'easy');
  mediumLevel.classList.remove('chosen');
  hardLevel.classList.remove('chosen');
  easyLevel.classList.add('chosen');
  console.log("easy");
});

mediumLevel.addEventListener("click", () => {
  localStorage.setItem('level', 'medium');
  mediumLevel.classList.add('chosen');
  hardLevel.classList.remove('chosen'); 
  easyLevel.classList.remove('chosen');
  console.log("medium");
});

hardLevel.addEventListener("click", () => {
  localStorage.setItem('level', 'hard');
  mediumLevel.classList.remove('chosen');
  hardLevel.classList.add('chosen');
  easyLevel.classList.remove('chosen');
  console.log("hard");
});

