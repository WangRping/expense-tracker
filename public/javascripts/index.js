// 計算總金額
const amount = document.querySelectorAll('.record-amout')
const amountWrapper = document.querySelector('.amount-wrapper')

let total = 0

amount.forEach(item => total += parseInt(item.textContent))
amountWrapper.innerHTML += `<h1>${total}</h1>`

// card顏色改變
const cards = document.querySelectorAll('.card')
const cardQTY = cards.length

for (let i = 0; i <= cards.length; i += 2) {
  cards[i].style.backgroundColor = '#f4f3f4';
}

for (let i = 1; i <= cards.length; i += 2) {
  cards[i].style.backgroundColor = '#ffffff';
}