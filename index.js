let servicesRender = [];

const buttons = document.querySelectorAll(".btn")
const optionEl = document.querySelector(".option")
const optionAmountEl = document.querySelector(".option-amount")
const calArr = []
const amountsEl = document.querySelector(".amounts")



buttons.forEach(btn => {
    btn.addEventListener("click" ,function(e){
        if (e.target.classList.contains("a")){
            washServices (e)
        } else if (e.target.classList.contains("b")){
            mowServices(e)
        } else if (e.target.classList.contains("c")){
            pullServices (e)
        }
        const amountEl = document.querySelectorAll(".amount")
        amountEl.forEach(amount => {
            cal (amount.innerHTML)
        })
       
    })
})

function washServices (){
    optionEl.innerHTML += `<div>Wash Car</div>`
    optionAmountEl.innerHTML += `<div class="amount">$10</div>`
}
function mowServices (){
    optionEl.innerHTML += `<div>Mow Lane</div>`
    optionAmountEl.innerHTML += `<div class="amount">$20</div>`
}

function pullServices (){
    optionEl.innerHTML += `<div>Pull Weeds</div>`
    optionAmountEl.innerHTML += `<div class="amount">$30</div>`
}
function cal (x){
    let number = parseInt(x)
    console.log(number)
    // x += x
    // amountsEl.innerHTML = x
}