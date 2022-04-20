
let servicesRender = [] 
let washService = {
        task : "Wash Car",
        amount: 10
}
let mowService = {
        task : "Mow Lawn",
        amount: 20
}
let pullService = {
        task : "Pull Weeds",
        amount: 30
}

let total = 0;
const buttons = document.querySelectorAll(".btn")
const optionEl = document.querySelector(".option")
const optionAmountEl = document.querySelector(".option-amount")
const totalEl = document.querySelector(".total-figure")




buttons.forEach(btn => {
    btn.addEventListener("click" ,function(e){
        if (e.target.classList.contains("a")){
            servicesRender.push(washService)
            optionEl.innerHTML += `<div>${washService.task}</div>`
            optionAmountEl.innerHTML += `<div><span class="amount-sign">$</span>${washService.amount}</div>`
        } else if (e.target.classList.contains("b")){
            servicesRender.push(mowService)
            optionEl.innerHTML += `<div>${mowService.task}</div>`
            optionAmountEl.innerHTML +=`<div><span class="amount-sign">$</span>${mowService.amount}</div>`
        } else if (e.target.classList.contains("c")){
            servicesRender.push(pullService)
            optionEl.innerHTML += `<div>${pullService.task}</div>`
            optionAmountEl.innerHTML += `<div><span class="amount-sign">$</span>${pullService.amount}</div>`
        }
        console.log("a", servicesRender.length)
        cal(servicesRender, total)
        })  
})

function cal (arr, total){
    for (i = 0; i < arr.length; i++){
            total += arr[i].amount;
            totalEl.innerHTML = `<span class="amount-sign">$</span>${total}`
    }
}
