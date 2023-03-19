const choiceField = document.querySelector(".choice span")
const optionsContainer =  document.querySelector(".options")
let options = document.querySelectorAll(".option")
const nextBtn = document.querySelector(".next-btn")
const question = document.querySelector(".question")
const category = document.querySelector(".category span")
const scoreField = document.querySelector(".score span")
let correctOption;
let questions = []
let currentIdx = 0
let score = 0

const fetchQuiz = async()=>{
    const res = await fetch("https://opentdb.com/api.php?amount=15")
    const data = res.json()
    return data
}

const loadQuestions = ()=>{
    question.innerHTML = questions[currentIdx].question
    category.textContent = questions[currentIdx].category
}

const shuffleArray = (array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }    
    return array
}

const loadOptions = ()=>{
    optionsContainer.innerHTML = ''
    const optionsArray = [[questions[currentIdx].correct_answer,1],[questions[currentIdx].incorrect_answers[0],0],[questions[currentIdx].incorrect_answers[1],0],[questions[currentIdx].incorrect_answers[2],0]]
    const shuffledOptions = shuffleArray(optionsArray)
    console.log(shuffledOptions);
    shuffledOptions.forEach((option,idx)=>{
        if(option[1]==1){
            correctOption = idx
        }
    })
    
    shuffledOptions.forEach(option=>{
        const optionDiv = document.createElement("div")
        optionDiv.classList.add("option")
        if(option[1]==1){
            optionDiv.classList.add("correct")
        }
        const optionH1 = document.createElement("h1")
        optionH1.textContent = option[0]
        optionDiv.appendChild(optionH1)
        optionsContainer.appendChild(optionDiv)
        options = document.querySelectorAll(".option")
        options.forEach(((option,idx)=>{
            option.addEventListener("click",()=>{
                choiceField.textContent = idx+1
            })
        }))
    })
} 

const endGame = ()=>{
    alert(`Congrats on reaching the end... Your score was ${score}`)
    location.href = "index.html"
}

window.addEventListener('load',async()=>{
    const data = await fetchQuiz()
    questions = data.results
    
    
    // Load the question
    loadQuestions()
    loadOptions()
    

    nextBtn.addEventListener('click',()=>{
        if(parseInt(choiceField.textContent)-1==correctOption){
            score++;
        }
        scoreField.textContent = score
        if(currentIdx==14){
            endGame()
        }
        currentIdx++
        loadQuestions()
        loadOptions()
    })
})