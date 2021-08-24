// ----------- SELECTORS -----------

// ----- Основные контейнеры
const caclContainer = document.querySelector('.container')
const listContainer = document.querySelector('.container-list')
const allListContainer = document.querySelector('.container-allList')



// инпут названия события
const inputTitle = document.querySelector('.input_title')

// кнопка Save в калькуляторе для сохранени события
const btnSave = document.querySelector('.btn_save')



// вывод текущего вводимого числа
const display = document.querySelector('.display')

// список всех введенных значений
const displayList = document.querySelector('.display-list')

// выводится итоговая сумма 
const displayFinal = document.querySelector('.display-final')


// ----- Кнопки калькулятора

// Цифровые кнопки
const tabNumber = document.querySelectorAll('.tab-number')

// Кнопки арифметических операций
const tabCalc = document.querySelectorAll('.tab-calc')
const tabPlus = document.querySelector('.tab-plus')

const tabEqual = document.querySelector('.tab-equal')

const containerBox = document.querySelector('.container-list')
const result = document.querySelector('.result')





// ------ ОСНОВНОЙ МАССИВ ХРАНЕНИЯ ДАННЫХ

// в нем каждый новый рассчет пользователем сохраняется в виде объекта. Новый объект пушится в массив. 

const dataArray = [
  {
    itemName: 'SpainTrip',
    numberData: [[150, 'Tickets'], [200, 'Hotel'], [100, 'Beer'], [30, 'Apple']],
    calcSum: function () { },
  },
  {
    itemName: 'Shoping',
    numberData: [[50, 'Dress'], [30, 'Phone']],
    calcSum: function () { },
  },
  {
    itemName: 'Guest',
    numberData: [[10, 'Potatos'], [20, 'Wine'], [40, 'Juice']],
    calcSum: function () { },
  },
]





// ----------- СТАРТОВЫЕ УСЛОВИЯ -----------

// переменная для сохраннеия текущего вводимого числа
let tempNumber = ''

// две переменные для сохраннеия чисел с которыми будет производиться операция
let calcNumber1 = ''
let calcNumber2 = ''

// переменная для сохраннеия выбранного дейтсивя калькуляции пользователем
let actionCalc = ''

let calculate = Number(0)

// число, которое образуется после определенной операции
let operation = 0;

// сохраняются все числа которые вводятся для суммирования результата
let numbersData = []






// ----------- ФУНКЦИОНАЛ КАЛЬКУЛЯТОРА -----------

// Нажатие по кнопкам цифр - проверяем какя из кнопок цифровой клавиатуры нажата
tabNumber.forEach(function (btn) {
  btn.addEventListener('click', function () {

    tempNumber = tempNumber + btn.textContent

    display.textContent = tempNumber

  })
})



// Нажатие по кнопке калькуляции
tabCalc.forEach(function (btn) {

  btn.addEventListener('click', function () {

    actionCalc = btn.textContent

    calcNumber1 = Number(tempNumber)


    displayList.insertAdjacentHTML("beforeEnd",
      `
     <p>${tempNumber}</p>
    `)

    display.textContent = actionCalc

    numbersData.push(Number(calcNumber1))


    tempNumber = ''

    let sum = 0

    for (const item of numbersData) {

      sum = sum + item

    }

    console.log(sum);

    displayFinal.textContent = sum

  })

})




// Событие клика по кнопке save, массив из инпута добавляется в объект
btnSave.addEventListener('click', function () {

  //  numbersData - массив из всех введенных значений передаем аргументом в функцию addNewData и   передаем название ивента из inputTitle.value
  addNewData(numbersData, inputTitle.value)

  //  после того как массив отправили в функцию numbersData обнуляем его
  numbersData = []



  // ------ дальше идет функционал выгрузки добавленного нового ивента в интерфейс 


  // выбираем из массива всех данных только последний добавленный объект -> ниже его выгружаем в HTML
  const lastItem = dataArray[dataArray.length - 1]

  // Выгрузка в HTML последнего добавленного в массив элемента
  containerBox.insertAdjacentHTML("beforeEnd",
    `
      <div class="result ${lastItem.itemName}">
       <p class="result-title"><b>${lastItem.itemName}</b></p>
       <p class="result-sum"></p>
      </div >
    `
  )


  let sum = 0

  // потом из каждого элемента списка довставляем его array
  for (const [i, list] of lastItem.numberData.entries()) {

    sum = sum + list[0]

    console.log(sum)

    document.querySelector(`.${lastItem.itemName}`).insertAdjacentHTML("beforeEnd",
      `

      <ul class="result-ul">
        <li>
          <p class="result-list">${list[0]}</p>
          <p class="result-name">${list[1]}<span class='result-name-span'>${i}</span></p>
        </li>
        </ul>
     `)
  }


  document.querySelector('.result-sum').insertAdjacentHTML("beforeEnd",
    `<p class="result-sum">${sum}</p>`)


  caclContainer.classList.add('shift-out-container')
  listContainer.classList.add('shift-in-container-list')


})



// ------ ДОБАВЛЕНИЕ НОВОГО ИВЕНТА В МАССИВ СО ВСЕМИ ИВЕНТАМИ

// получаем их интерфейса название для расходной темы и массив из чисел из калькулятора, это пункты расходов (к ним по дефолту проставляется имя "Item name")
const addNewData = function (arr, title) {

  const number = []  // создаем пустой массив, в который дальше засунем каждый элемент массива в конструкцию типа [10, 'Item name']

  // ------ объект описывающий расходный пункт, он заполняется данными из интерфейса и потом пушится в массив со всеми расходными пунктами
  const itemObj = {
    calcSum: function () { },
  }

  for (const i of arr) {  // итерируем массив который передаем аргументом, чтобы заполнить массив number
    number.push([i, 'Item name']) // заполняем массив number в нужном формате [[число, "Item name"]
  }

  itemObj.itemName = title   // добавляем в объект item name из переданного аргумента
  itemObj.numberData = number

  dataArray.push(itemObj)

}





// ----------- ВЫВОД В ИНТЕРФЕЙС -----------

// выгрузка данных из массива с событиями в интерфейс на страницу со всеми ивентами
for (const item of dataArray) {

  // сначала выгружаем основные элементы списка, добавляем класс, чтобы потом именно сюда  вставлять детали array

  allListContainer.insertAdjacentHTML("beforeEnd",
    `<div class="result ${item.itemName}">
     <p><b>${item.itemName}</b></p>
    </div >`
  )

}


const eventList = document.querySelectorAll('.result')
console.log(eventList)


// выгружаем данные при клике по событию на странице всех событий на страницу с детализацией выбранного события
eventList.forEach(function (item) {

  item.addEventListener('click', function () {

    allListContainer.style.display = 'none'
    listContainer.style.display = 'block'


    const name = item.classList


    for (const list of dataArray) {

      // console.log(list);

      if (list.itemName === name[1]) {
        console.log(list);
        console.log(list.numberData);

        listContainer.insertAdjacentHTML("beforeEnd",
          `
          <div class="result ${list.itemName}">
            <p class="result-title"><b>${list.itemName}</b></p>
            <p class="result-sum"></p>
          </div >
          `
        )

        for (const number of list.numberData) {

          document.querySelector(`.container-list .${list.itemName}`).insertAdjacentHTML("beforeEnd",
            `
          <ul class="result-ul">
            <li>
            <p class="result-list">${number[0]}</p>
            <p class="result-name">${number[1]}</p>
            </li>
          </ul>
         `)

        }

      }

    }

  })
})




