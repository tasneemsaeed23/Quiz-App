const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High-level Text Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML div element?",
    answers: [
      { text: "It defines a hyperlink.", correct: false },
      {
        text: "It defines a division or a section in an HTML document.",
        correct: true,
      },
      { text: " It defines an image.", correct: false },
      { text: "HIt defines an ordered list.", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML head element?",
    answers: [
      {
        text: " It defines the main content of the HTML document.",
        correct: false,
      },
      {
        text: " It defines a section in the HTML document for navigation.",
        correct: false,
      },
      {
        text: " It is used for formatting text within the document.",
        correct: false,
      },
      { text: " It contains metadata about the HTML document.", correct: true },
    ],
  },
  {
    question: "What does the HTML attribute src stand for?",
    answers: [
      { text: " Source", correct: true },
      { text: " Script", correct: false },
      { text: " Style", correct: false },
      { text: " Subresource", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbuttons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => selectAnswer(e));
  });
}

function resetState() {
  //Hide the "Next" button
  nextButton.style.display = "none";

  //Remove all child element from the 'asnwerbuttons' container
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function selectAnswer(e) {
  // Get the button that was clicked
  const selectedBtn = e.target;

  // Check if the selected answer is correct based on the 'data-correct' attribute
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Add a class to the selected button based on correctness
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment the score only for correct answers
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerbuttons.children).forEach((button) => {
    // Check if the button is marked as correct
    if (button.dataset.correct === "true") {
      // Add the "correct" class to the button
      button.classList.add("correct");
    }
    // Disable the button
    button.disabled = true;
  });
  // Display the "Next" button
  nextButton.style.display = "block";
}

function showScore() {
  // Reset the state (clears buttons and hides "Next" button)
  resetState();
  // Display the final score
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  // Change the "Next" button text to "Play Again"
  nextButton.innerHTML = "Play Again";
  // Display the "Next" button
  nextButton.style.display = "block";
}

function handleNextButton() {
  // Increment the current question index
  currentQuestionIndex++;
  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    // If there are more questions, display the next question
    showQuestion();
  } else {
    // If there are no more questions, display the final score
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
