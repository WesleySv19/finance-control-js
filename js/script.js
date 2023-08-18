const tbody = document.querySelector('tbody')
const descItem = document.querySelector('#desc')
const amount = document.querySelector('#amount')
const type = document.querySelector('#type')
const btnNew = document.querySelector('#btnNew')

const incomes = document.querySelector('.incomes')
const expenses = document.querySelector('expenses')
const total = document.querySelector('.total')

let items 

function deleteItem (index) {
    items.splice(index, 1)
    setItensBd()
    loadItensBd()
}   

function insertItem (item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td class="columnType">${
            item.type === 'Entrada'
            ? ' <i class"bxs-chevron-up-circle" '
            : '<i class="bxs-chevron-down-circle" '
        }</td>

        <td class="columnAction">
            <button onclick"deleteItem(${index})"><i class="bx bx-trash'></i><button/>"
        </td>
    `

    tbody.appendChild(tr)
}

function loadItens () {
    items = getItensBd()
    tbody.innerHTML = ''
    items.forEach((item, index) => {
    insertItem(item, index)
    })

    getTotals()
}

function getTotals () {
    const amountIncomes = items
    .filter((item) => item.type === 'Entrada')
    .map((transaction) => Number(transaction.amount))
    
    const amounExpenses = items
    .filter((item) => item.type === 'Saída')
    .map((transaction) => Number(transaction.amount))

    const totalIncomes = amountIncomes 
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2)

    const totalExpenses = Math.abs(
        amounExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2)

    const totaItens = (totalIncomes - totalExpenses).toFixed(2)

    incomes.innerHTML = totalIncomes
    expenses.innerHTML = totalExpenses
    total.innerHTML = totaItens
}

btnNew.onclick = () => {
    if(descItem.value === '' || amount.value === '' || type.value === '') {
        return alert('Preencha todos os campos!')
    }

    items.push( {
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value
    })

    setItensBd()
    loadItens()

    descItem.value = ''
    amount.value = ''
}
 
const getItensBd = () => JSON.parse(localStorage.getItem('db_getItems')) ?? []
const setItensBd = () => localStorage.setItem('db_items', JSON.stringify(items))