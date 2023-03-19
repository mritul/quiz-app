const startBtn = document.querySelector(".start-btn")
const modal =  document.querySelector(".modal")
const backBtn = document.querySelector(".back-btn")
const usernameForm = document.querySelector(".username-form")

startBtn.addEventListener('click',()=>{
    modal.showModal()
})

backBtn.addEventListener('click',()=>{
    modal.close()
})

usernameForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    location.href = "/game.html"
})
