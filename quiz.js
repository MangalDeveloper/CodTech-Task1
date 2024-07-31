const quizData = [
    {
      question: "What is the capital of Canada?",
      a: "Berlin",
      b: "Madrid",
      c: "Paris",
      d: "Ottawa",
      correct: "d",
    },
    {
      question: "Who is the CEO of Tesla?",
      a: "Bill Gates",
      b: "Steve Jobs",
      c: "Elon Musk",
      d: "Jeff Bezos",
      correct: "c",
    },
    {
      question: "What is the smallest unit of a program?",
      a: "Token",
      b: "Variable",
      c: "Constant",
      d: "Expression",
      correct: "a",
    },
    {
      question: "Who is the founder of Java Language?",
      a: "Dennis Ritchie",
      b: "James Gosling",
      c: "Guido Van Russom",
      d: "Bjarne Stroustrup",
      correct: "b",
    }
  ];
  
  let currentQuiz = 0;
  let score = 0;
  const answers = Array(quizData.length).fill(null);
  
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const navigationContainer = document.getElementById("navigation");
  
  function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    quizContainer.innerHTML = `
      <div class="question">${currentQuizData.question}</div>
      <label>
        <input type="radio" name="answer" value="a" ${answers[currentQuiz] === 'a' ? 'checked' : ''}>
        ${currentQuizData.a}
      </label>
      <label>
        <input type="radio" name="answer" value="b" ${answers[currentQuiz] === 'b' ? 'checked' : ''}>
        ${currentQuizData.b}
      </label>
      <label>
        <input type="radio" name="answer" value="c" ${answers[currentQuiz] === 'c' ? 'checked' : ''}>
        ${currentQuizData.c}
      </label>
      <label>
        <input type="radio" name="answer" value="d" ${answers[currentQuiz] === 'd' ? 'checked' : ''}>
        ${currentQuizData.d}
      </label>
    `;
  }
  
  function getSelected() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let answer;
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.value;
      }
    });
    return answer;
  }
  
  function showResults() {
    resultsContainer.innerHTML = `
      <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
    `;
  }
  
  function createNavigation() {
    navigationContainer.innerHTML = '';
    quizData.forEach((_, index) => {
      const button = document.createElement('button');
      button.classList.add('nav-button');
      button.innerText = index + 1;
      button.addEventListener('click', () => {
        saveAnswer();
        currentQuiz = index;
        loadQuiz();
      });
      navigationContainer.appendChild(button);
    });
  }
  
  function saveAnswer() {
    const answer = getSelected();
    if (answer) {
      if (answers[currentQuiz] === null && answer === quizData[currentQuiz].correct) {
        score++;
      } else if (answers[currentQuiz] !== null && answers[currentQuiz] !== quizData[currentQuiz].correct && answer === quizData[currentQuiz].correct) {
        score++;
      } else if (answers[currentQuiz] !== null && answers[currentQuiz] === quizData[currentQuiz].correct && answer !== quizData[currentQuiz].correct) {
        score--;
      }
      answers[currentQuiz] = answer;
    }
  }
  
  submitButton.addEventListener("click", () => {
    saveAnswer();
    if (answers.every(ans => ans !== null)) {
      showResults();
    } else {
      alert('Please answer all the questions before submitting.');
    }
  });
  
  createNavigation();
  loadQuiz();