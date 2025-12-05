const openQuiz = document.getElementById("stomach-vir")
const overlay = document.getElementById("overlay")
const closeBtn = document.getElementById("close")
const startBox = document.getElementById("start-container")
const startBtn = document.getElementById("start-btn")
const quizContainer = document.getElementById("quiz-container")
const questionEl = document.getElementById("question")
const optionsEl = document.getElementById("options")
const nextBtn = document.getElementById("next-btn")
const resultContainer = document.getElementById("result-container")
const resultMessage = document.getElementById("result-message")
const scoreEl = document.getElementById("score")
const restartBtn = document.getElementById("restart-btn")
const title = document.getElementById("title")

const quizData = {
  stomach: {
    name: `Stomach Virus Quiz`,
    data: [
    {
      question:
        "Which virus commonly causes stomach flu (gastroenteritis) outbreaks on cruise ships?",
      options: [ 
        "Influenza", 
        "Norovirus",
        "HIV", 
        "Rhinovirus"
      ],
      answer: "Norovirus",
    },
    {
      question: "Which symptom is most typical of a stomach virus?",
      options: [
        "Coughing and sneezing",
        "Skin rash",
        "Ear pain",
        "Vomiting and diarrhea",
      ],
      answer: "Vomiting and diarrhea",
    },
    {
      question:
        "How long should you wash your hands to help prevent stomach viruses?",
      options: [
        "5 seconds",
        "10 seconds",
        "At least 20 seconds",
        "Just rinse with water",
      ],
answer: "At least 20 seconds",
    },
    {
      question:
        "Which drink best helps prevent dehydration during a stomach virus?",
      options: ["Oral rehydration solution", "Energy drinks", "Coffee", "Soda"],
      answer: "Oral rehydration solution",
    },
    {
      question: "Rotavirus mainly affects which group most severely?",
      options: [
        "Healthy adults",
        "Only the elderly",
        "Only athletes",
        "Young children and infants",
      ],
      answer: "Young children and infants",
    },
  ]
  }
}

let stomachData=quizData.stomach.data
let stomachName=quizData.stomach.name
let currentQIndex=0
let score=0

title.textContent = stomachName

function openModal(){
    overlay.classList.add("active")
}

function closeModal(){
    overlay.classList.remove("active")
}

function showQuestion(){
    // Clear previous options
    optionsEl.innerHTML = ""
    nextBtn.classList.add("hidden") // Hide nextBtn until option picked
    let currentQuestion = stomachData[currentQIndex]
    console.log(currentQuestion.answer)
    questionEl.textContent = currentQuestion.question
    currentQuestion.options.forEach(option=>{
        const li = document.createElement("li")
        li.textContent = option
        li.onclick = ()=> selectOption(li, currentQuestion.answer)
        optionsEl.appendChild(li)

        console.log(li)
    }) // 'variable'=> means 'function' =>
    
}

function selectOption(selectedEl, correctAnswer){
    //Disable all options once one is selected
    Array.from(optionsEl.children).forEach(li=>{
        li.onclick = null
        //Highlight correct answer
        if(li.textContent === correctAnswer){
            li.style.backgroundColor = "green"
        }
    })
    if(selectedEl.textContent === correctAnswer){
        score++
    }else{
        selectedEl.style.backgroundColor = "red"
    }
    nextBtn.classList.remove("hidden")
}

function startQuiz(){
    currentQIndex = 0
    score = 0
    startBox.classList.add("hidden")
    resultContainer.classList.add("hidden")
    quizContainer.classList.remove("hidden")
    showQuestion()
}

function nextQuestion(){
  currentQIndex++
  if(currentQIndex < stomachData.length){
    showQuestion()
  }else{
    endQuiz()
  }
}
function endQuiz(){
  quizContainer.classList.add("hidden")
  resultContainer.classList.remove("hidden")
  //scoreEl.textContent = score +"/" +stomachData.length : This would work
  scoreEl.textContent = `${score} / ${stomachData.length}`
    // ${*variable*} around variables so that java knows it is a variable since it's wrapped in backticks
  if(score === stomachData.length){
    resultMessage.textContent = "Good job! You got a perfect score!"
  }else if(score <= stomachData.length-1){
    resultMessage.textContent = "Almost had it! Try again!"
  }else{
    resultMessage.textContent = "Missed it completely."}
}
function restartButton(){
  resultContainer.classList.add("hidden")
  startBox.classList.remove("hidden")
}
//console.log(stomachData.length)
startBtn.addEventListener("click", startQuiz)
nextBtn.addEventListener("click", nextQuestion)
restartBtn.addEventListener("click", restartButton) 
openQuiz.addEventListener("click", openModal)
closeBtn.addEventListener("click", closeModal)
window.addEventListener("click", function(event){
    if(event.target===overlay){
        return closeModal()
    }
})