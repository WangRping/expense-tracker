const amount = document.querySelectorAll('.record-amout')
const amoutWrapper = document.querySelector('.amout-wrapper')

let total = 0

amount.forEach(item => total += parseInt(item.textContent))

amoutWrapper.innerHTML += `<h1>${total}</h1>`