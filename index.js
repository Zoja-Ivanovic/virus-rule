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
const banner = document.getElementById("quiz-banner")

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
  },
  respiratory: {
    name: "Respiratory Virus",
    data: [
      {
        question: "Which virus often causes the common cold?",
        options: ["Norovirus", "Ebola virus", "Rhinovirus", "Hantavirus"],
        answer: "Rhinovirus",
      },
      {
        question: "Which virus is a common cause of bronchiolitis in infants?",
        options: [
          "RSV (Respiratory Syncytial Virus)",
          "Varicella",
          "Rotavirus",
          "Adenovirus only",
        ],
        answer: "RSV (Respiratory Syncytial Virus)",
      },
      {
        question:
          "Which action most helps reduce spread of respiratory viruses?",
        options: [
          "Take antibiotics",
          "Drink more soda",
          "Stay awake late",
          "Cover coughs/sneezes and wash hands",
        ],
        answer: "Cover coughs/sneezes and wash hands",
      },
{
        question: "Flu vaccines are updated most years because...",
        options: [
          "Vaccines expire after 24 hours",
          "Viruses hate winter",
          "Flu viruses change over time",
          "It's just tradition",
        ],
        answer: "Flu viruses change over time",
      },
      {
        question:
          "Which symptom is more typical of respiratory viruses than stomach viruses?",
        options: [
          "Vomiting",
          "Cough and sore throat",
          "Diarrhea",
          "Abdominal cramps",
        ],
        answer: "Cough and sore throat",
      },
    ],
  },
  vector: {
    name: "Mosquito-Borne Virus",
    data: [
      {
        question: "Mosquito-borne viruses are usually spread by which animal?",
        options: ["Cats", "Fish", "Mosquitoes", "Earthworms"],
        answer: "Mosquitoes",
      },
      {
        question: "Which is a mosquito-borne viral disease?",
        options: ["Strep throat", "Athlete’s foot", "Dengue fever", "Tetanus"],
        answer: "Dengue fever",
      },
      {
        question: "To reduce mosquito bites and viral spread, you can:",
        options: [
          "Wear shorts at dusk",
          "Sleep with open windows (no screens)",
          "Eat sweet foods",
          "Use repellent & remove standing water",
        ],
        answer: "Use repellent & remove standing water",
      },
      {
        question: "Aedes mosquitoes often bite:",
        options: [
          "Only at midnight",
          "During the day",
          "Only at sunrise",
          "Never",
        ],
        answer: "During the day",
      },
      {
        question: "Which body response fights viruses after vaccination?",
        options: ["Antibodies", "Earwax", "Tears", "Nails"],
        answer: "Antibodies",
      },
    ],
  },
}

let quizName = "Virus quiz"
let quizContent = [] // THIS IS TO GET A SINGLE QUIZZES DATA!
let currentCategory = null
let currentQIndex=0
let score=0

function openModal(){
    overlay.classList.add("active")
}

function closeModal(){
    overlay.classList.remove("active")
}

function setDataset(category, bannerUrl){
  if (!quizData[category]) return
  currentCategory = category
  quizName = quizData[category].name
  quizContent = quizData[category].data.slice()
  if (banner && bannerUrl){
    banner.src = bannerUrl
  }
  title.textContent = quizName
  startBtn.disabled = false
  resultContainer.classList.add("hidden")
  quizContainer.classList.add("hidden")
  startBox.classList.remove("hidden")
}

document.querySelectorAll(".starter-quiz-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category")
    const bannerUrl = btn.getAttribute("data-image")
    setDataset(category, bannerUrl)                     
    openModal()
  })
})

function showQuestion(){
    // Clear previous options
    optionsEl.innerHTML = ""
    nextBtn.classList.add("hidden") // Hide nextBtn until option picked
    let currentQuestion = quizContent[currentQIndex]
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
  if(currentQIndex < quizContent.length){
    showQuestion()
  }else{
    endQuiz()
  }
}
function endQuiz(){
  quizContainer.classList.add("hidden")
  resultContainer.classList.remove("hidden")
  //scoreEl.textContent = score +"/" +quizContent.length : This would work
  scoreEl.textContent = `${score} / ${quizContent.length}`
    // ${*variable*} around variables so that java knows it is a variable since it's wrapped in backticks
  if(score === quizContent.length){
    resultMessage.textContent = "Good job! You got a perfect score!"
  }else if(score <= quizContent.length-1){
    resultMessage.textContent = "Almost had it! Try again!"
  }else{
    resultMessage.textContent = "Missed it completely."}
}
function restartButton(){
  resultContainer.classList.add("hidden")
  startBox.classList.remove("hidden")
}
//console.log(quizContent.length)
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