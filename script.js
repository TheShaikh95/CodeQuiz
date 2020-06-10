var startButton = document.getElementById('strt-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: 'A ____ is a reserved word in Javascript',
    answers: [
      { text: 'Keyword', correct: true },
      { text: 'Apple', correct: false },
      {text:'Webpage', correct: false},
      {text: 'Syntax', correct: false}
    ]
  },
  {
    question: 'How do you find the number with the highest value of x and y?',
    answers: [
      { text: 'Math.math(x,y)', correct: true },
      { text: 'Top(x,y)', correct: false },
      { text: 'Math.ceil(x,y)', correct: false },
      { text: 'Fun Fun Function', correct: false }
    ]
  },
  {
    question: 'How can you detect the client browser name?',
    answers: [
      { text: 'client.navName', correct: false },
      { text: 'navigator.appName', correct: true },
      { text: 'browser.name', correct: false },
      { text: 'navigator.name', correct: false }
    ]
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    answers: [
      { text: 'onmouseclick', correct: false },
      { text: 'onclick', correct: true },
      { text: 'onmouseover', correct: false },
      { text: 'change', correct: false},

    ]
  },
  {
      question:'How to insert comments that have more than one line?',
      answers: [
          { text:'//This comment has more than one line//', correct: false},
          { text:'<!--This comment has more than one line-->', correct: false},
          {text : '/*This comment has more than one line*/', correct: true},
          { text: 'I have no idea what I am doing', correct: false},
      ]
  }
]